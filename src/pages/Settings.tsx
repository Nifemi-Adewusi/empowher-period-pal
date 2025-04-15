
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const { userData, setUserData } = useUser();
  const [name, setName] = React.useState(userData?.name || '');
  const [lastPeriod, setLastPeriod] = React.useState<Date | undefined>(
    userData?.lastPeriod
  );
  const [cycleLength, setCycleLength] = React.useState(
    userData?.cycleLength?.toString() || '28'
  );
  const [periodLength, setPeriodLength] = React.useState(
    userData?.periodLength?.toString() || '5'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Name is required",
        variant: "destructive",
      });
      return;
    }

    setUserData({
      ...userData,
      name: name.trim(),
      lastPeriod,
      cycleLength: parseInt(cycleLength, 10),
      periodLength: parseInt(periodLength, 10),
    });

    toast({
      title: "Settings updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-empowher-light/30 pb-20">
      <div className="bg-white shadow-sm mb-6">
        <div className="container max-w-md mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-empowher-text">Settings</h1>
          <p className="text-sm text-empowher-text/60 mt-1">
            Manage your personal preferences
          </p>
        </div>
      </div>

      <div className="container max-w-md mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Setting */}
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <div className="flex gap-2">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Last Period Setting */}
          <div className="space-y-2">
            <Label>Last Period Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lastPeriod ? format(lastPeriod, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={lastPeriod}
                  onSelect={setLastPeriod}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Cycle Length Setting */}
          <div className="space-y-2">
            <Label htmlFor="cycleLength">Cycle Length (days)</Label>
            <Input
              id="cycleLength"
              type="number"
              min="21"
              max="35"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
            />
            <p className="text-xs text-empowher-text/60">
              Average menstrual cycle length is 28 days
            </p>
          </div>

          {/* Period Length Setting */}
          <div className="space-y-2">
            <Label htmlFor="periodLength">Period Length (days)</Label>
            <Input
              id="periodLength"
              type="number"
              min="3"
              max="7"
              value={periodLength}
              onChange={(e) => setPeriodLength(e.target.value)}
            />
            <p className="text-xs text-empowher-text/60">
              Average period length is 5 days
            </p>
          </div>

          <Button type="submit" className="w-full btn-gradient">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
