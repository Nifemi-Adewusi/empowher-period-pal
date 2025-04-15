import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { getDayStatus } from '@/utils/periodCalculator';

const Calendar: React.FC = () => {
  const { userData } = useUser();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  if (!userData || !userData.lastPeriod) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-empowher-light/30">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <h2 className="text-xl font-semibold">Calendar</h2>
            <p className="text-sm text-empowher-text/70">Please set up your cycle information first</p>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  const cycleLength = userData.cycleLength || 28;
  const periodLength = userData.periodLength || 5;
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const getDayClass = (day: Date) => {
    if (!userData?.lastPeriod) return '';
    
    const status = getDayStatus(day, userData.lastPeriod, cycleLength, periodLength);
    
    if (status === 'onPeriod') {
      return 'bg-empowher-pink text-empowher-tertiary font-medium';
    }
    
    if (status === 'fertile') {
      return 'bg-empowher-light text-empowher-tertiary';
    }
    
    return '';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-empowher-light/20 pb-16">
      <div className="container max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-empowher-text mb-6">Your Cycle Calendar</h1>
        
        <Card className="border-empowher-light shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <Button variant="ghost" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-3">
            {/* Day names header */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-empowher-text/70 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: getDay(startOfMonth(currentMonth)) }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              
              {days.map((day) => (
                <button
                  key={day.toString()}
                  className={cn(
                    "aspect-square rounded-full flex items-center justify-center text-sm",
                    isSameMonth(day, currentMonth) ? "text-empowher-text" : "text-empowher-text/30",
                    isSameDay(day, new Date()) && "ring-2 ring-empowher-primary ring-offset-2",
                    getDayClass(day)
                  )}
                >
                  {format(day, 'd')}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow p-4 border border-gray-100">
          <h3 className="text-sm font-medium text-empowher-text mb-3">Calendar Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-empowher-pink mr-2"></div>
              <span className="text-sm">Period Days</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-empowher-light mr-2"></div>
              <span className="text-sm">Fertile Window</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full ring-2 ring-empowher-primary ring-offset-2 mr-2"></div>
              <span className="text-sm">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get day of week, with 0 being Sunday
function getDay(date: Date) {
  let day = date.getDay();
  return day;
}

export default Calendar;
