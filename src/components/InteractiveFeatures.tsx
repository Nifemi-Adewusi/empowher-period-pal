
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Moon, Sun, Flower2, Crown } from 'lucide-react';

const phases = [
  {
    name: "Menstrual Phase",
    icon: <Moon className="h-8 w-8 text-blue-500" />,
    color: "from-blue-500 to-indigo-500",
    message: "Time for rest and reflection. Honor your body's need for gentleness. 🌙",
    tips: ["Practice gentle yoga", "Journal your thoughts", "Drink warm herbal tea"]
  },
  {
    name: "Follicular Phase", 
    icon: <Flower2 className="h-8 w-8 text-green-500" />,
    color: "from-green-500 to-emerald-500",
    message: "New beginnings! Your energy is building. Perfect time for planning. 🌱",
    tips: ["Start new projects", "Plan your goals", "Try new activities"]
  },
  {
    name: "Ovulatory Phase",
    icon: <Sun className="h-8 w-8 text-yellow-500" />,
    color: "from-yellow-500 to-orange-500", 
    message: "You're glowing! Peak energy and confidence. Shine bright, queen! ☀️",
    tips: ["Schedule important meetings", "Connect with friends", "Express yourself boldly"]
  },
  {
    name: "Luteal Phase",
    icon: <Crown className="h-8 w-8 text-purple-500" />,
    color: "from-purple-500 to-pink-500",
    message: "Time to focus inward. Listen to your body's wisdom. 👑",
    tips: ["Practice self-care", "Organize your space", "Prepare for rest"]
  }
];

const InteractiveFeatures: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleHeartClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <div className="py-16 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Celebrate Every Phase of Your Cycle 🌙✨
          </h2>
          <p className="text-lg text-gray-600">
            Click on each phase to discover personalized wisdom and celebrate your natural rhythms!
          </p>
        </div>

        {/* Interactive Phase Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {phases.map((phase, index) => (
            <Button
              key={phase.name}
              variant={selectedPhase === index ? "default" : "outline"}
              className={`p-6 h-auto flex flex-col gap-2 transition-all duration-300 hover:scale-105 ${
                selectedPhase === index 
                  ? `bg-gradient-to-r ${phase.color} text-white shadow-lg` 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPhase(index)}
            >
              {phase.icon}
              <span className="text-sm font-medium text-center">{phase.name}</span>
            </Button>
          ))}
        </div>

        {/* Phase Information Card */}
        <Card className="overflow-hidden shadow-xl border-none">
          <div className={`h-3 bg-gradient-to-r ${phases[selectedPhase].color}`}></div>
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              {phases[selectedPhase].icon}
              <h3 className="text-2xl font-bold text-gray-800">
                {phases[selectedPhase].name}
              </h3>
            </div>
            
            <p className="text-xl text-gray-700 mb-6 font-medium">
              {phases[selectedPhase].message}
            </p>
            
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Phase-Perfect Tips:
              </h4>
              <ul className="space-y-2">
                {phases[selectedPhase].tips.map((tip, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Love Button */}
        <div className="text-center mt-12">
          <div className="mb-4">
            <p className="text-lg text-gray-600 mb-2">
              Send some love to all the amazing women out there! 💕
            </p>
            <p className="text-sm text-gray-500">
              Hearts sent: <span className="font-bold text-pink-600">{clickCount}</span>
            </p>
          </div>
          <Button
            onClick={handleHeartClick}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform"
          >
            <Heart className="mr-2 h-5 w-5" />
            Spread the Love
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFeatures;
