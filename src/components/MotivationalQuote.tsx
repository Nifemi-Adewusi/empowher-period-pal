
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "You are strong, resilient, and capable of handling whatever today brings.",
    author: "EmpowHer"
  },
  {
    text: "Your body is a miracle that deserves to be celebrated, even on the tough days.",
    author: "EmpowHer"
  },
  {
    text: "Take a deep breath. You've got this. Your strength is greater than any discomfort.",
    author: "EmpowHer"
  },
  {
    text: "Embrace your cycle as a superpower that connects you to your body's wisdom.",
    author: "EmpowHer"
  },
  {
    text: "Self-care isn't selfish. It's necessary, especially during your period.",
    author: "EmpowHer"
  },
  {
    text: "You are not your hormones. You are a powerful force capable of amazing things.",
    author: "EmpowHer"
  },
  {
    text: "Your worth is not measured by your productivity. Rest is revolutionary.",
    author: "EmpowHer"
  },
  {
    text: "Honor your body's needs today. You deserve that kindness.",
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
            <p className="text-lg font-medium text-empowher-text">"{quote.text}"</p>
            <p className="text-sm mt-2 text-empowher-text/70">- {quote.author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuote;
