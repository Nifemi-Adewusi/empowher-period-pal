
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type UserData = {
  name: string;
  lastPeriod?: Date;
  cycleLength: number;
  periodLength: number;
};

type UserContextType = {
  userData: UserData | null;
  loading: boolean;
  setUserData: (data: Partial<UserData>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'empowher_user_data';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      // Convert ISO string back to Date object if lastPeriod exists
      if (parsed.lastPeriod) {
        parsed.lastPeriod = new Date(parsed.lastPeriod);
      }
      setUserDataState(parsed);
    } else {
      setShowNameDialog(true);
    }
    setLoading(false);
  }, []);

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState(prev => {
      const newData = prev ? { ...prev, ...data } : {
        name: data.name || '',
        cycleLength: data.cycleLength || 28,
        periodLength: data.periodLength || 5,
        ...data
      };
      
      // Store in localStorage, converting Date to ISO string
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...newData,
        lastPeriod: newData.lastPeriod?.toISOString()
      }));
      
      return newData;
    });
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUserData({ name: tempName.trim() });
      setShowNameDialog(false);
      toast({
        title: "Welcome!",
        description: `It's great to meet you, ${tempName}!`,
      });
    }
  };

  return (
    <UserContext.Provider value={{ userData, loading, setUserData }}>
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to EmpowHer!</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                What would you like to be called?
              </label>
              <Input
                id="name"
                autoFocus
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full"
                placeholder="Enter your name"
              />
            </div>
            <Button type="submit" className="w-full btn-gradient" disabled={!tempName.trim()}>
              Continue
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
