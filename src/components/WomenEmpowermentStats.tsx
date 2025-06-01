
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Crown, Sparkles } from 'lucide-react';

const stats = [
  {
    icon: <Users className="h-8 w-8 text-pink-500" />,
    number: 50000,
    label: "Queens in Our Community",
    suffix: "+",
    color: "text-pink-600"
  },
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    number: 1200000,
    label: "Cycles Celebrated",
    suffix: "+", 
    color: "text-red-600"
  },
  {
    icon: <Crown className="h-8 w-8 text-yellow-500" />,
    number: 95,
    label: "Feel More Empowered",
    suffix: "%",
    color: "text-yellow-600"
  },
  {
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    number: 89,
    label: "Report Better Self-Care",
    suffix: "%",
    color: "text-purple-600"
  }
];

const WomenEmpowermentStats: React.FC = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const increment = stat.number / 100;
      let current = 0;
      
      return setInterval(() => {
        if (current < stat.number) {
          current += increment;
          setAnimatedNumbers(prev => {
            const newNumbers = [...prev];
            newNumbers[index] = Math.min(Math.round(current), stat.number);
            return newNumbers;
          });
        }
      }, 20);
    });

    const cleanup = setTimeout(() => {
      timers.forEach(timer => clearInterval(timer));
    }, 2000);

    return () => {
      timers.forEach(timer => clearInterval(timer));
      clearTimeout(cleanup);
    };
  }, []);

  return (
    <div className="py-16 px-4 bg-gradient-to-r from-pink-50 via-purple-50 to-rose-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Empowering Women Worldwide 🌍
          </h2>
          <p className="text-lg text-gray-600">
            Join a global movement of women celebrating their cycles and embracing their power!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {animatedNumbers[index].toLocaleString()}{stat.suffix}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              "EmpowHer helped me embrace my cycle instead of dreading it. I feel like a queen!" 👑
            </h3>
            <p className="text-gray-600 italic">
              - Sarah, Community Member
            </p>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className="h-5 w-5 text-pink-500 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomenEmpowermentStats;
