
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';

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

  const generateNewAffirmation = () => {
    console.log('Generate button clicked!');
    console.log('Current index:', currentAffirmationIndex);
    
    setIsGenerating(true);
    
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
    }, 500);
  };

  console.log('Current affirmation:', affirmations[currentAffirmationIndex]);

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-50 to-pink-50">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-pink-600 text-transparent bg-clip-text flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Daily Affirmation
          <Sparkles className="h-5 w-5 text-pink-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 min-h-[100px] flex items-center justify-center">
          <p className={`text-lg font-medium text-gray-700 leading-relaxed transition-opacity duration-300 ${
            isGenerating ? 'opacity-50' : 'opacity-100'
          }`}>
            {affirmations[currentAffirmationIndex]}
          </p>
        </div>
        
        <Button
          onClick={generateNewAffirmation}
          disabled={isGenerating}
          className="bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white transition-all hover:scale-105"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'New Affirmation'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AffirmationGenerator;
