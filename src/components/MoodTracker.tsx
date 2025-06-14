
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const moods = [
  { emoji: '😍', label: 'Amazing', color: 'bg-pink-500' },
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-500' },
  { emoji: '😌', label: 'Peaceful', color: 'bg-green-500' },
  { emoji: '😐', label: 'Okay', color: 'bg-gray-500' },
  { emoji: '😢', label: 'Sad', color: 'bg-blue-500' },
  { emoji: '😤', label: 'Frustrated', color: 'bg-red-500' },
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          How are you feeling today, Queen? 👑
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
          {moods.map((mood) => (
            <Button
              key={mood.label}
              variant="outline"
              className={`h-16 w-16 text-2xl rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                selectedMood === mood.label 
                  ? `${mood.color} text-white border-transparent` 
                  : 'border-gray-300 hover:border-pink-400'
              }`}
              onClick={() => handleMoodSelect(mood.label)}
            >
              {mood.emoji}
            </Button>
          ))}
        </div>
        
        {selectedMood && (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">You're feeling {selectedMood.toLowerCase()} today</p>
            {showCelebration && (
              <div className="animate-bounce text-pink-500 font-semibold">
                ✨ Your feelings are valid and beautiful! ✨
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
