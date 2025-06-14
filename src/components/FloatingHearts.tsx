
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const createHeart = (x: number, y: number) => {
    const newHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
      delay: 0
    };
    
    setHearts(prev => [...prev, newHeart]);
    
    // Remove heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 3000);
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createHeart(x, y);
  };

  return (
    <>
      <style>
        {`
          @keyframes float-up {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-200px) scale(0.5);
              opacity: 0;
            }
          }
          .floating-heart {
            animation: float-up 3s ease-out forwards;
          }
        `}
      </style>
      <div 
        className="fixed inset-0 pointer-events-none z-40"
        onClick={handleClick}
        style={{ pointerEvents: 'auto' }}
      >
        {hearts.map(heart => (
          <Heart
            key={heart.id}
            className="absolute text-pink-500 pointer-events-none floating-heart"
            style={{
              left: heart.x,
              top: heart.y,
              fontSize: `${Math.random() * 20 + 15}px`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default FloatingHearts;
