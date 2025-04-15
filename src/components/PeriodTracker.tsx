import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Droplets } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useUser } from '@/context/UserContext';
import { daysUntilNextPeriod } from '@/utils/periodCalculator';

const PeriodTracker: React.FC = () => {
  const { userData, setUserData } = useUser();
  const [date, setDate] = useState<Date | undefined>(userData?.lastPeriod);
  const [isOnPeriod, setIsOnPeriod] = useState<boolean | null>(null);

  // If we don't have a last period date, show the date selector
  if (!userData?.lastPeriod && isOnPeriod === null) {
    return (
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Welcome to Period Tracking</CardTitle>
          <CardDescription>
            Let's get started by setting up your cycle information
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2">
            <p className="text-sm">When did your last period start?</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full btn-gradient"
            onClick={() => {
              if (date) {
                setUserData({ lastPeriod: date });
                setIsOnPeriod(false);
              }
            }}
            disabled={!date}
          >
            Save & Continue
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // If we have asked if they're on their period now
  if (isOnPeriod !== null && !userData?.lastPeriod) {
    return (
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>One more question</CardTitle>
          <CardDescription>
            This helps us personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Are you currently on your period?</p>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className={`flex-1 ${isOnPeriod ? 'bg-empowher-primary text-white' : ''}`}
              onClick={() => {
                setIsOnPeriod(true);
                setUserData({ 
                  lastPeriod: new Date(),
                  cycleLength: 28,
                  periodLength: 5
                });
              }}
            >
              Yes
            </Button>
            <Button 
              variant="outline" 
              className={`flex-1 ${isOnPeriod === false ? 'bg-empowher-primary text-white' : ''}`}
              onClick={() => {
                setIsOnPeriod(false);
                if (date) {
                  setUserData({ 
                    lastPeriod: date,
                    cycleLength: 28,
                    periodLength: 5
                  });
                }
              }}
            >
              No
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Normal tracker display once we have the info
  if (userData?.lastPeriod) {
    const cycleLength = userData.cycleLength || 28;
    const daysUntil = daysUntilNextPeriod(userData.lastPeriod, cycleLength);
    const nextPeriodDate = addDays(new Date(), daysUntil);
    
    return (
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-empowher-primary to-empowher-secondary text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold">Cycle Day {cycleLength - daysUntil + 1}</h3>
              <p className="text-white/80">of your {cycleLength}-day cycle</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Droplets className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-empowher-text/70">Next Period</p>
                <p className="font-medium">{format(nextPeriodDate, "MMM d, yyyy")}</p>
              </div>
              <div>
                <p className="text-sm text-empowher-text/70">Days Until</p>
                <p className="font-medium text-right">{daysUntil} days</p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-empowher-primary to-empowher-secondary h-2.5 rounded-full" 
                style={{ width: `${(1 - daysUntil / cycleLength) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 border-t border-gray-100 p-4">
          <Button 
            variant="outline" 
            className="w-full border-empowher-primary/50 text-empowher-primary hover:bg-empowher-light/50 hover:text-empowher-primary"
            onClick={() => {
              setUserData({ lastPeriod: new Date() });
            }}
          >
            Log Period Today
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return null;
};

export default PeriodTracker;
