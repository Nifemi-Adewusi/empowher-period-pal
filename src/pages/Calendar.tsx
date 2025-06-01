
import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, Heart, Droplets, Sun, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { getDayStatus } from '@/utils/periodCalculator';

const Calendar: React.FC = () => {
  const { userData } = useUser();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  
  if (!userData || !userData.lastPeriod) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-12">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full animate-pulse">
                <CalendarIcon className="h-12 w-12 text-empowher-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
              Your Cycle Calendar
            </h2>
            <p className="text-empowher-text/70 mt-2">Set up your cycle information to see your beautiful calendar</p>
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
      return 'bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg transform hover:scale-110';
    }
    
    if (status === 'fertile') {
      return 'bg-gradient-to-br from-purple-300 to-violet-400 text-white shadow-md transform hover:scale-105';
    }
    
    return 'hover:bg-empowher-light/50 hover:scale-105 transform transition-all duration-200';
  };

  const getDayIcon = (day: Date) => {
    if (!userData?.lastPeriod) return null;
    
    const status = getDayStatus(day, userData.lastPeriod, cycleLength, periodLength);
    
    if (status === 'onPeriod') {
      return <Droplets className="h-3 w-3 animate-pulse" />;
    }
    
    if (status === 'fertile') {
      return <Sparkles className="h-3 w-3 animate-pulse" />;
    }
    
    if (isSameDay(day, new Date())) {
      return <Sun className="h-3 w-3 text-yellow-500 animate-pulse" />;
    }
    
    return null;
  };

  const getPhaseMessage = (day: Date) => {
    if (!userData?.lastPeriod) return '';
    
    const status = getDayStatus(day, userData.lastPeriod, cycleLength, periodLength);
    
    switch (status) {
      case 'onPeriod':
        return "Period Day - You're powerful! 💪";
      case 'fertile':
        return "Fertile Window - Your body is amazing! ✨";
      default:
        return "Regular Day - You're doing great! 🌟";
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 pb-20">
      {/* Animated Header */}
      <div className="bg-gradient-to-r from-empowher-primary to-empowher-secondary text-white shadow-xl">
        <div className="container max-w-md mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <CalendarIcon className="h-8 w-8 mr-3 animate-pulse" />
              <h1 className="text-3xl font-bold">Your Cycle Calendar</h1>
            </div>
            <p className="text-white/90 text-lg">Track your beautiful journey</p>
          </div>
        </div>
      </div>

      <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Main Calendar Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-empowher-light/50 to-purple-100/50">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={prevMonth}
                className="p-2 hover:bg-white/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <Button 
                variant="ghost" 
                onClick={nextMonth}
                className="p-2 hover:bg-white/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-4">
            {/* Day names header with beautiful styling */}
            <div className="grid grid-cols-7 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div key={day} className="text-center text-sm font-semibold text-empowher-text/80 py-3">
                  <div className={`inline-block px-2 py-1 rounded-full ${index === 0 || index === 6 ? 'bg-gradient-to-r from-pink-100 to-purple-100' : ''}`}>
                    {day}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Calendar grid with beautiful animations */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: getDay(startOfMonth(currentMonth)) }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              
              {days.map((day) => (
                <button
                  key={day.toString()}
                  className={cn(
                    "aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition-all duration-300",
                    isSameMonth(day, currentMonth) ? "text-empowher-text" : "text-empowher-text/30",
                    isSameDay(day, new Date()) && "ring-2 ring-yellow-400 ring-offset-2",
                    getDayClass(day),
                    hoveredDay && isSameDay(day, hoveredDay) && "shadow-xl"
                  )}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={() => setSelectedDay(day)}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-medium">{format(day, 'd')}</span>
                    {getDayIcon(day)}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Selected Day Info */}
        {selectedDay && (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-white to-empowher-light/30 animate-fade-in">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-empowher-text mb-2">
                  {format(selectedDay, 'EEEE, MMMM d')}
                </h3>
                <p className="text-empowher-text/80 text-lg">
                  {getPhaseMessage(selectedDay)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Beautiful Legend */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-empowher-text mb-4 text-center">
              Your Cycle Legend ✨
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-rose-100 to-pink-100">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 mr-3 flex items-center justify-center">
                    <Droplets className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-medium">Period Days</span>
                </div>
                <Heart className="h-4 w-4 text-pink-500" />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-100 to-violet-100">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-300 to-violet-400 mr-3 flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-medium">Fertile Window</span>
                </div>
                <Sparkles className="h-4 w-4 text-purple-500" />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-100 to-amber-100">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 mr-3 flex items-center justify-center ring-2 ring-yellow-400 ring-offset-2">
                    <Sun className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-medium">Today</span>
                </div>
                <Sun className="h-4 w-4 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
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
