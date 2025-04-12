
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-empowher-light to-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-8 animate-float">
          <div className="w-20 h-20 bg-empowher-primary rounded-full flex items-center justify-center mx-auto">
            <Heart size={40} className="text-white animate-pulse-soft" />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-empowher-text animate-fade-in">
          EmpowHer <span className="text-empowher-primary">Period Pal</span>
        </h1>
        
        <p className="mt-4 text-xl text-empowher-text/80 max-w-md animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Track your cycle, understand your body, and embrace your power
        </p>
        
        <div className="mt-8 space-y-4 w-full max-w-xs animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button 
            className="w-full btn-gradient py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate('/auth')}
          >
            Get Started
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg border-empowher-primary/30 text-empowher-primary hover:bg-empowher-light/50"
            onClick={() => navigate('/auth')}
          >
            Log In
          </Button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-10 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-empowher-text">Why Choose EmpowHer?</h2>
          
          <div className="grid gap-4">
            <Feature 
              title="Personalized Tracking" 
              description="Track your unique cycle with customized predictions and insights"
            />
            <Feature 
              title="Daily Motivation" 
              description="Receive empowering messages that remind you of your strength"
            />
            <Feature 
              title="Science-Backed Tips" 
              description="Access research-based advice for managing symptoms"
            />
            <Feature 
              title="Private & Secure" 
              description="Your data is encrypted and never shared with third parties"
            />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 text-center bg-white text-empowher-text/70 text-sm">
        <p>© 2025 EmpowHer Period Pal. All rights reserved.</p>
      </footer>
    </div>
  );
};

type FeatureProps = {
  title: string;
  description: string;
};

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="flex items-start p-4 bg-empowher-light/30 rounded-lg">
      <div className="bg-gradient-to-br from-empowher-primary to-empowher-secondary rounded-full p-2 text-white mr-4">
        <Heart size={16} />
      </div>
      <div>
        <h3 className="font-semibold text-empowher-text">{title}</h3>
        <p className="text-sm text-empowher-text/70">{description}</p>
      </div>
    </div>
  );
};

export default Index;
