
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Heart, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const celebrationMessages = [
  "🌟 You are powerful beyond measure, and worthy of every good thing! 🌟",
  "💖 Your cycle is your superpower - embrace every phase with love! 💖", 
  "👑 Queens support queens - you're never alone in this journey! 👑",
  "✨ Every phase of your cycle deserves celebration and gentle care! ✨",
  "🌸 Your femininity is a gift - honor it with compassion and kindness! 🌸",
  "💜 Self-love isn't selfish, it's necessary. You deserve your own kindness! 💜",
  "🦋 You're stronger than your struggles and more resilient than you know! 🦋",
  "🌈 Your feelings are valid, your pain matters, and your joy is contagious! 🌈",
  "💝 Be patient with yourself - healing and growth take time, beautiful soul! 💝"
];

const CelebrationBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % celebrationMessages.length);
    }, 4000); // Slightly longer to read the more caring messages
    
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white py-4 px-4 shadow-lg animate-slide-in-top">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <Heart className="h-5 w-5 animate-bounce" />
            <Crown className="h-5 w-5 animate-pulse" />
          </div>
          <p className="font-medium text-center flex-1 animate-fade-in leading-relaxed">
            {celebrationMessages[currentMessage]}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-white hover:bg-white/20 p-1 ml-4"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CelebrationBanner;
