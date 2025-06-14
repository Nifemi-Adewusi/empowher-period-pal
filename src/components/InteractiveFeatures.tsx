
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles, Calendar, TrendingUp } from 'lucide-react';
import MoodTracker from './MoodTracker';
import AffirmationGenerator from './AffirmationGenerator';
import FloatingHearts from './FloatingHearts';

const InteractiveFeatures: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50 relative">
      <FloatingHearts />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-4">
            Interactive Wellness Hub 🌈
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Click anywhere to spread some love, track your mood, and get inspired! ✨
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <MoodTracker />
          <AffirmationGenerator />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <CardHeader className="pb-3">
              <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
              <CardTitle className="text-lg text-pink-600">Self-Love</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Practice daily self-compassion and embrace your beautiful journey</p>
            </CardContent>
          </Card>

          <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <CardHeader className="pb-3">
              <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <CardTitle className="text-lg text-purple-600">Mindfulness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Connect with your inner wisdom and find peace in every moment</p>
            </CardContent>
          </Card>

          <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <CardHeader className="pb-3">
              <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <CardTitle className="text-lg text-blue-600">Cycle Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Align your activities with your natural rhythms for optimal wellness</p>
            </CardContent>
          </Card>

          <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <CardHeader className="pb-3">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <CardTitle className="text-lg text-green-600">Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Track your progress and celebrate every step of your wellness journey</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFeatures;
