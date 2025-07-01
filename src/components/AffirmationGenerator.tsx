
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Heart, Star } from 'lucide-react';

const affirmations = [
  "I am worthy of love, respect, and all the beautiful things life has to offer 💖",
  "My body is amazing and deserves gentle care during every phase of my cycle 🌸",
  "I trust my intuition and inner wisdom to guide me through each day 🦋",
  "I am strong, resilient, and capable of handling whatever comes my way 💪",
  "My sensitivity is a superpower, not a weakness 🌟",
  "I deserve rest, comfort, and kindness, especially during challenging times 🤗",
  "I am exactly where I need to be in my journey right now 🌈",
  "My feelings are valid and I honor them with compassion 💕",
  "I radiate confidence, beauty, and positive energy wherever I go ✨",
  "I choose to speak to myself with the same kindness I show my best friend 🌺",
  "I am grateful for my body's incredible wisdom and natural rhythms 🌙",
  "I deserve to take up space and have my voice heard 👑"
];

const AffirmationGenerator: React.FC = () => {
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const generateNewAffirmation = () => {
    console.log('Generate button clicked!');
    console.log('Current index:', currentAffirmationIndex);
    
    setIsGenerating(true);
    setShowSparkles(true);
    
    setTimeout(() => {
      // Get a different affirmation (not the current one)
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * affirmations.length);
        console.log('Generated new index:', newIndex);
      } while (newIndex === currentAffirmationIndex && affirmations.length > 1);
      
      console.log('Setting new index:', newIndex);
      setCurrentAffirmationIndex(newIndex);
      setIsGenerating(false);
      
      // Hide sparkles after a delay
      setTimeout(() => setShowSparkles(false), 2000);
    }, 800);
  };

  console.log('Current affirmation:', affirmations[currentAffirmationIndex]);

  return (
    <div className="relative">
      {/* Floating decorative elements */}
      <div className="absolute -inset-4 pointer-events-none overflow-hidden">
        <Heart className={`absolute top-2 right-2 h-4 w-4 text-pink-400 transition-all duration-1000 ${showSparkles ? 'animate-bounce opacity-100' : 'opacity-30'}`} />
        <Star className={`absolute bottom-2 left-2 h-3 w-3 text-yellow-400 transition-all duration-1000 ${showSparkles ? 'animate-pulse opacity-100' : 'opacity-30'}`} />
        <Sparkles className={`absolute top-4 left-4 h-3 w-3 text-purple-400 transition-all duration-1000 ${showSparkles ? 'animate-spin opacity-100' : 'opacity-30'}`} />
      </div>

      <Card className={`border-none shadow-2xl bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 overflow-hidden transition-all duration-500 ${isGenerating ? 'scale-105 shadow-pink-200/50' : ''}`}>
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 opacity-20 animate-pulse"></div>
        <div className="absolute inset-[1px] bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-lg"></div>
        
        <div className="relative">
          <CardHeader className="text-center relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/30 to-transparent"></div>
            
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 text-transparent bg-clip-text flex items-center justify-center gap-2 relative z-10">
              <Sparkles className={`h-5 w-5 text-yellow-500 transition-all duration-500 ${isGenerating ? 'animate-spin' : ''}`} />
              Daily Affirmation
              <Sparkles className={`h-5 w-5 text-pink-500 transition-all duration-500 ${isGenerating ? 'animate-spin' : ''}`} />
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-6 relative">
            {/* Main affirmation display */}
            <div className={`relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 min-h-[120px] flex items-center justify-center shadow-inner transition-all duration-500 ${
              isGenerating ? 'transform scale-95 bg-gradient-to-br from-pink-50 to-purple-50' : ''
            }`}>
              {/* Animated background glow */}
              <div className={`absolute inset-0 bg-gradient-to-r from-pink-200/20 via-purple-200/20 to-yellow-200/20 rounded-2xl transition-opacity duration-500 ${
                showSparkles ? 'opacity-100 animate-pulse' : 'opacity-0'
              }`}></div>
              
              <p className={`text-lg font-medium text-gray-700 leading-relaxed transition-all duration-500 relative z-10 ${
                isGenerating ? 'opacity-30 transform scale-95' : 'opacity-100 transform scale-100'
              }`}>
                {affirmations[currentAffirmationIndex]}
              </p>
              
              {/* Sparkle effects */}
              {showSparkles && (
                <>
                  <Sparkles className="absolute top-4 left-4 h-4 w-4 text-pink-400 animate-ping" />
                  <Sparkles className="absolute bottom-4 right-4 h-3 w-3 text-purple-400 animate-pulse" />
                  <Star className="absolute top-4 right-4 h-3 w-3 text-yellow-400 animate-bounce" />
                </>
              )}
            </div>
            
            {/* Enhanced button */}
            <div className="relative">
              <Button
                onClick={generateNewAffirmation}
                disabled={isGenerating}
                className={`relative bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 hover:from-yellow-600 hover:via-pink-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl px-8 py-4 text-lg font-semibold ${
                  isGenerating ? 'animate-pulse scale-105' : ''
                }`}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-md blur-sm opacity-60 animate-pulse"></div>
                
                <div className="relative flex items-center gap-3">
                  <RefreshCw className={`h-5 w-5 transition-transform duration-500 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Manifesting Magic...' : 'New Affirmation'}</span>
                  {!isGenerating && <Sparkles className="h-4 w-4 animate-pulse" />}
                </div>
              </Button>
              
              {/* Button sparkle trail */}
              {showSparkles && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-2 -left-2 h-2 w-2 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -right-2 h-2 w-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                  <div className="absolute -top-2 -right-2 h-1 w-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </div>

            {/* Celebration message */}
            {showSparkles && (
              <div className="text-center animate-fade-in">
                <p className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text animate-bounce">
                  ✨ You are amazing and deserving of all good things! ✨
                </p>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default AffirmationGenerator;
