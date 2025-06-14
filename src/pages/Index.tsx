
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, ChevronRight, ClipboardList, Sparkles, Star, Crown, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import MotivationalQuote from '@/components/MotivationalQuote';
import PeriodTracker from '@/components/PeriodTracker';
import CelebrationBanner from '@/components/CelebrationBanner';
import InteractiveFeatures from '@/components/InteractiveFeatures';

const Index: React.FC = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);

  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-pink-500" />,
      title: "Smart Period Tracking",
      description: "AI-powered predictions that learn from your unique cycle",
      color: "from-pink-500 to-rose-400"
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Wellness & Self-Care",
      description: "Personalized self-care rituals for every phase of your cycle",
      color: "from-red-500 to-pink-400"
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-purple-500" />,
      title: "Symptom Intelligence",
      description: "Track patterns and get insights that empower your health decisions",
      color: "from-purple-500 to-violet-400"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      title: "Daily Affirmations",
      description: "Boost your confidence with cycle-synced motivational content",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Crown className="h-6 w-6 text-yellow-500" />,
      title: "Queen Mode",
      description: "Celebrate your power with achievements and milestone tracking",
      color: "from-yellow-500 to-orange-400"
    },
    {
      icon: <Flower2 className="h-6 w-6 text-green-500" />,
      title: "Cycle Wisdom",
      description: "Learn about your body's natural rhythms and embrace your femininity",
      color: "from-green-500 to-emerald-400"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-4 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-pink-200 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-1/4 right-4 sm:right-20 w-12 sm:w-16 h-12 sm:h-16 bg-purple-200 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-8 sm:w-12 h-8 sm:h-12 bg-rose-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-6 sm:w-8 h-6 sm:h-8 bg-yellow-200 rounded-full opacity-70 animate-bounce"></div>
        
        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <Heart 
            key={i} 
            className={`absolute text-pink-300 opacity-30 animate-pulse hidden sm:block`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${0.5 + Math.random() * 0.5})`
            }}
          />
        ))}
      </div>

      {/* Celebration Banner */}
      {showCelebration && <CelebrationBanner />}

      {/* Hero Section */}
      <div className="relative pt-16 pb-8 sm:pb-12 px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-4 sm:p-6 inline-block shadow-2xl">
              <div className="flex items-center gap-2">
                <Heart className="h-8 sm:h-12 w-8 sm:w-12 text-pink-500 animate-pulse" />
                <Crown className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-500 animate-bounce" />
              </div>
            </div>
          </div>

          {userData ? (
            <div className="space-y-6 sm:space-y-8">
              <div className="relative">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-transparent bg-clip-text animate-fade-in leading-tight">
                  Welcome back, Queen {userData.name}! 👑
                </h1>
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4">
                  <Star className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-400 animate-spin" />
                </div>
              </div>
              
              <p className="text-lg sm:text-xl text-gray-700 animate-fade-in px-4">
                Your wellness journey continues. You're doing amazing! ✨
              </p>
              
              <div className="grid gap-4 sm:gap-6 max-w-3xl mx-auto">
                <PeriodTracker />
                <MotivationalQuote onPeriod={false} />
              </div>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-transparent bg-clip-text animate-fade-in leading-tight px-4">
                Embrace Your Power,<br />
                Celebrate Your Cycle 🌸
              </h1>
              <p className="text-lg sm:text-2xl text-gray-700 max-w-2xl mx-auto animate-fade-in font-medium px-4">
                Join a community of queens who celebrate their femininity and track their wellness with joy and pride! 💖
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Button 
                  className="px-6 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 hover:from-pink-600 hover:via-purple-600 hover:to-rose-600 transition-all animate-fade-in shadow-2xl hover:shadow-pink-500/25 hover:scale-105 transform"
                  onClick={() => navigate('/dashboard')}
                >
                  Start Your Journey ✨
                  <ChevronRight className="ml-2 h-5 sm:h-6 w-5 sm:w-6" />
                </Button>
                <Button 
                  variant="outline"
                  className="px-6 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 transition-all"
                  onClick={() => setShowCelebration(true)}
                >
                  Celebrate Women 🎉
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Features Section */}
      <InteractiveFeatures />

      {/* Enhanced Features Grid */}
      <div className="py-12 sm:py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
              Features That Celebrate You 🌟
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Every feature is designed to honor your journey and empower your wellness decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="group hover:shadow-2xl transition-all duration-500 border-none bg-white/80 backdrop-blur-sm hover:-translate-y-2 hover:scale-105 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <CardContent className="p-6 sm:p-8 text-center relative">
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Sparkles className="h-4 sm:h-6 w-4 sm:w-6 text-pink-500" />
                  </div>
                  <div className={`mb-4 sm:mb-6 inline-block p-3 sm:p-4 bg-gradient-to-r ${feature.color} bg-opacity-10 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 sm:py-20 px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative text-center max-w-4xl mx-auto text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in">
            Ready to Celebrate Your Femininity? 💃
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 animate-fade-in px-4">
            Join thousands of women who have embraced their power and transformed their relationship with their cycle
          </p>
          <Button 
            className="px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl bg-white text-purple-600 hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 transform font-bold"
            onClick={() => navigate('/dashboard')}
          >
            Begin Your Empowerment Journey 🚀
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 sm:py-12 text-center bg-white/90 backdrop-blur-sm border-t border-pink-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center gap-4 mb-4 sm:mb-6">
            <Heart className="h-5 sm:h-6 w-5 sm:w-6 text-pink-500 animate-pulse" />
            <Crown className="h-5 sm:h-6 w-5 sm:w-6 text-yellow-500" />
            <Flower2 className="h-5 sm:h-6 w-5 sm:w-6 text-green-500" />
          </div>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            © 2025 EmpowHer Period Pal. Celebrating women, empowering choices. 💜
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Every woman deserves to feel empowered in her own skin ✨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
