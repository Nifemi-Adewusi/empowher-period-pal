
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, TrendingUp, Heart, Sparkles, Sun, Moon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PeriodTracker from '@/components/PeriodTracker';
import MotivationalQuote from '@/components/MotivationalQuote';
import Tips from '@/components/Tips';
import SymptomTracker from '@/components/SymptomTracker';
import { useUser } from '@/context/UserContext';
import { getDayStatus } from '@/utils/periodCalculator';
import { useNavigate } from 'react-router-dom';

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const getGreetingIcon = () => {
  const hour = new Date().getHours();
  if (hour < 12) return <Sun className="h-5 w-5 text-yellow-500 animate-pulse" />;
  if (hour < 18) return <Sun className="h-5 w-5 text-orange-500" />;
  return <Moon className="h-5 w-5 text-purple-500" />;
};

const getMoodEmojis = () => ['😊', '🥰', '😌', '💪', '✨', '🌟', '💖', '🦋'];

const Dashboard: React.FC = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [isOnPeriod, setIsOnPeriod] = useState(false);
  const [greeting] = useState(getGreeting());
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (userData?.lastPeriod) {
      const status = getDayStatus(
        new Date(),
        userData.lastPeriod,
        userData.cycleLength || 28,
        userData.periodLength || 5
      );
      setIsOnPeriod(status === 'onPeriod');
    }
  }, [userData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoodIndex((prev) => (prev + 1) % getMoodEmojis().length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 pb-20">
      {/* Beautiful Header with Animation */}
      <div className="bg-gradient-to-r from-empowher-primary via-empowher-secondary to-purple-600 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"></div>
        
        <div className="container max-w-md mx-auto px-4 py-8 relative">
          <div className={`text-center transition-all duration-1000 ${showCelebration ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex items-center justify-center mb-4">
              {getGreetingIcon()}
              <h1 className="text-3xl font-bold ml-3">
                {greeting}, {userData.name.split(' ')[0]}!
              </h1>
              <div className="ml-3 text-3xl animate-bounce">
                {getMoodEmojis()[currentMoodIndex]}
              </div>
            </div>
            
            <div className="flex items-center justify-center text-white/90 text-lg mb-4">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>

            {/* Dynamic Status Message */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-lg font-medium">
                {isOnPeriod 
                  ? "You're on your period - you're incredibly strong! 💪✨" 
                  : "You're glowing today, beautiful! 🌟💖"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content with Beautiful Cards */}
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Enhanced Period Tracker */}
          <div className="animate-fade-in">
            <PeriodTracker />
          </div>
          
          {/* Motivational Quote with Enhanced Styling */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-2xl blur opacity-30"></div>
              <div className="relative">
                <MotivationalQuote onPeriod={isOnPeriod} />
              </div>
            </div>
          </div>
          
          {/* Enhanced Symptom Tracker */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <SymptomTracker />
          </div>
          
          {/* Mood Insights Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
                Your Mood Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {['😊', '😌', '💪', '✨'].map((emoji, index) => (
                  <div 
                    key={index} 
                    className="text-center p-3 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="text-2xl mb-1">{emoji}</div>
                    <div className="text-xs text-empowher-text/70">
                      {['Happy', 'Calm', 'Strong', 'Radiant'][index]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-empowher-text/80">
                  Track your daily mood to discover patterns and celebrate your emotional journey! 🌈
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Tips Section with Enhanced Visual Appeal */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Tips category={isOnPeriod ? 'cramps' : 'general'} />
          </div>
          
          {/* Enhanced Quick Actions */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              variant="outline" 
              className="py-8 h-auto flex flex-col border-2 border-purple-200 hover:border-purple-400 bg-gradient-to-br from-white to-purple-50 hover:from-purple-50 hover:to-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              onClick={() => navigate('/calendar')}
            >
              <CalendarIcon className="h-8 w-8 text-empowher-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-empowher-primary text-lg font-semibold mb-1">Calendar</span>
              <span className="text-xs text-empowher-text/60">View your beautiful cycle</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="py-8 h-auto flex flex-col border-2 border-pink-200 hover:border-pink-400 bg-gradient-to-br from-white to-pink-50 hover:from-pink-50 hover:to-pink-100 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              onClick={() => navigate('/insights')}
            >
              <TrendingUp className="h-8 w-8 text-pink-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-pink-500 text-lg font-semibold mb-1">Insights</span>
              <span className="text-xs text-empowher-text/60">Discover your patterns</span>
            </Button>
          </div>

          {/* Celebration Message */}
          {showCelebration && (
            <Card className="border-0 shadow-xl bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 text-white animate-fade-in overflow-hidden relative">
              <div className="absolute inset-0 opacity-20"></div>
              <CardContent className="p-6 text-center relative">
                <div className="flex items-center justify-center mb-3">
                  <Star className="h-6 w-6 text-yellow-300 animate-pulse mr-2" />
                  <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                  <Star className="h-6 w-6 text-yellow-300 animate-pulse ml-2" />
                </div>
                <h3 className="text-xl font-bold mb-2">You're Doing Amazing! ✨</h3>
                <p className="text-white/90">
                  Every day of tracking is a step towards understanding your beautiful, unique cycle. Keep shining! 🌟
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
