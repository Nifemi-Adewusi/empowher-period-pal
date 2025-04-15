
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, ChevronRight, ClipboardList, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import MotivationalQuote from '@/components/MotivationalQuote';
import PeriodTracker from '@/components/PeriodTracker';

const Index: React.FC = () => {
  const { userData } = useUser();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-pink-500" />,
      title: "Smart Period Tracking",
      description: "Accurately predict your next period with our AI-powered calendar"
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-purple-500" />,
      title: "Symptom Logging",
      description: "Track your symptoms and get personalized insights"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      title: "Wellness Tips",
      description: "Receive daily tips tailored to your cycle phase"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-empowher-light/50 to-white">
      {/* Hero Section with Dynamic Content */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmRlNjhlIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative pt-16 pb-12 px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-4 inline-block">
                <Heart className="h-12 w-12 text-empowher-primary animate-pulse" />
              </div>
            </div>

            {userData ? (
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-empowher-primary to-purple-600 text-transparent bg-clip-text animate-fade-in">
                  Welcome back, {userData.name}!
                </h1>
                <div className="grid gap-6 max-w-2xl mx-auto">
                  <PeriodTracker />
                  <MotivationalQuote onPeriod={false} />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-empowher-primary to-purple-600 text-transparent bg-clip-text animate-fade-in">
                  Track Your Cycle, <br />Embrace Your Power
                </h1>
                <p className="text-xl text-empowher-text/80 max-w-xl mx-auto animate-fade-in">
                  Join thousands of women who trust EmpowHer for personalized period tracking and wellness insights.
                </p>
                <Button 
                  className="mt-8 px-8 py-6 text-lg bg-gradient-to-r from-empowher-primary to-purple-600 hover:opacity-90 transition-all animate-fade-in shadow-xl hover:shadow-2xl"
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-empowher-text">
            Why Choose EmpowHer?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="group hover:shadow-xl transition-all duration-300 border-none bg-gradient-to-br from-white to-empowher-light/10"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-block p-3 bg-white rounded-xl shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-empowher-text">
                    {feature.title}
                  </h3>
                  <p className="text-empowher-text/70">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center bg-white/50 backdrop-blur-sm border-t border-empowher-light">
        <p className="text-empowher-text/70 text-sm">
          © 2025 EmpowHer Period Pal. Empowering women through technology.
        </p>
      </footer>
    </div>
  );
};

export default Index;
