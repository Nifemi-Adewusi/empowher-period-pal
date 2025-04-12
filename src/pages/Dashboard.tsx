
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PeriodTracker from '@/components/PeriodTracker';
import MotivationalQuote from '@/components/MotivationalQuote';
import Tips from '@/components/Tips';
import SymptomTracker from '@/components/SymptomTracker';
import { useAuth } from '@/context/AuthContext';
import { getDayStatus } from '@/utils/periodCalculator';

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isOnPeriod, setIsOnPeriod] = useState(false);
  const [greeting] = useState(getGreeting());

  useEffect(() => {
    if (user?.lastPeriod) {
      const status = getDayStatus(
        new Date(),
        user.lastPeriod,
        user.cycleLength || 28,
        user.periodLength || 5
      );
      setIsOnPeriod(status === 'onPeriod');
    }
  }, [user]);

  if (!user) {
    return null; // User should be redirected to auth if not logged in
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-empowher-light/30 pb-16">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container max-w-md mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-empowher-text">
            {greeting}, {user.name.split(' ')[0]}
          </h1>
          <div className="flex items-center text-sm text-empowher-text/60 mt-1">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container max-w-md mx-auto px-4 py-4">
        <div className="space-y-6">
          {/* Period Tracker */}
          <div className="animate-fade-in">
            <PeriodTracker />
          </div>
          
          {/* Motivational Quote */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <MotivationalQuote onPeriod={isOnPeriod} />
          </div>
          
          {/* Symptom Tracker */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <SymptomTracker />
          </div>
          
          {/* Tips Section - Show different tips based on period status */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Tips category={isOnPeriod ? 'cramps' : 'general'} />
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button variant="outline" className="py-6 h-auto flex flex-col">
              <span className="text-empowher-primary text-lg mb-1">Calendar</span>
              <span className="text-xs text-empowher-text/60">View cycle history</span>
            </Button>
            <Button variant="outline" className="py-6 h-auto flex flex-col">
              <span className="text-empowher-primary text-lg mb-1">Insights</span>
              <span className="text-xs text-empowher-text/60">Analyze your patterns</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
