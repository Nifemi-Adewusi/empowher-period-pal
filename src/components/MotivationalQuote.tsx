
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "Your pain is valid, your feelings matter, and you are so much stronger than you realize. Take it one breath at a time, beautiful soul.",
    author: "EmpowHer"
  },
  {
    text: "It's okay to not be okay today. Your body is doing incredible work, and you deserve all the gentleness in the world right now.",
    author: "EmpowHer"
  },
  {
    text: "You are not broken, you are not too much, and you are not alone. Millions of women are walking this journey with you, sending you love.",
    author: "EmpowHer"
  },
  {
    text: "Rest is not giving up - it's honoring your body's needs. You're allowed to take up space, feel your feelings, and ask for help.",
    author: "EmpowHer"
  },
  {
    text: "This discomfort is temporary, but your strength is permanent. You've survived every difficult day so far - that's 100% success rate.",
    author: "EmpowHer"
  },
  {
    text: "Your cycle connects you to the rhythm of the moon, the tides, and generations of powerful women before you. You carry ancient wisdom.",
    author: "EmpowHer"
  },
  {
    text: "Be patient with yourself today. Healing isn't linear, and neither is your journey. Every small step counts, every breath matters.",
    author: "EmpowHer"
  },
  {
    text: "You don't have to earn your worth through productivity. You are valuable simply because you exist. Rest without guilt, love.",
    author: "EmpowHer"
  },
  {
    text: "Your sensitivity is a superpower, not a weakness. In a world that often feels harsh, your gentleness is revolutionary.",
    author: "EmpowHer"
  },
  {
    text: "When the world feels heavy, remember: you are loved beyond measure, you matter deeply, and tomorrow holds new possibilities.",
    author: "EmpowHer"
  },
  {
    text: "It's okay to cry, to feel overwhelmed, to need extra comfort. Your emotions are messengers - listen to them with compassion.",
    author: "EmpowHer"
  },
  {
    text: "You are writing a story of resilience with every cycle you navigate. Each month, you prove to yourself that you can overcome anything.",
    author: "EmpowHer"
  }
];

type MotivationalQuoteProps = {
  onPeriod?: boolean;
};

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ onPeriod = false }) => {
  const [quote, setQuote] = useState(quotes[0]);
  const [animate, setAnimate] = useState(false);
  
  // Change quote every few hours
  useEffect(() => {
    const randomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setAnimate(false);
      setTimeout(() => {
        setQuote(quotes[randomIndex]);
        setAnimate(true);
      }, 500);
    };
    
    randomQuote(); // Set initial quote
    const interval = setInterval(randomQuote, 4 * 60 * 60 * 1000); // Every 4 hours
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`overflow-hidden transition-all duration-500 ${
      onPeriod 
        ? 'bg-gradient-to-br from-empowher-peach to-empowher-pink border-empowher-pink/30' 
        : 'card-gradient'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white bg-opacity-30 rounded-full p-2">
            <Quote className="h-6 w-6 text-empowher-primary" />
          </div>
          <div className={`transition-opacity duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-lg font-medium text-empowher-text leading-relaxed">"{quote.text}"</p>
            <p className="text-sm mt-3 text-empowher-text/70 italic">- {quote.author} 💕</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuote;
