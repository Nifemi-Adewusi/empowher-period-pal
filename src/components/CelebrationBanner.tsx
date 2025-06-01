
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Heart, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const celebrationMessages = [
  "🌟 You are powerful beyond measure! 🌟",
  "💖 Your cycle is your superpower! 💖", 
  "👑 Queens don't compete, they celebrate each other! 👑",
  "✨ Every phase of your cycle deserves celebration! ✨",
  "🌸 Your femininity is a gift to the world! 🌸",
  "💜 Self-love is revolutionary! 💜"
];

const CelebrationBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % celebrationMessages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white py-3 px-4 shadow-lg animate-slide-in-top">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <Heart className="h-5 w-5 animate-bounce" />
            <Crown className="h-5 w-5 animate-pulse" />
          </div>
          <p className="font-medium text-center flex-1 animate-fade-in">
            {celebrationMessages[currentMessage]}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-white hover:bg-white/20 p-1"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CelebrationBanner;
