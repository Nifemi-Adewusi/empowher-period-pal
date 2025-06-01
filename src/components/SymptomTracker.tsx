
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Droplets, ThermometerSnowflake, Heart, FlaskConical, 
  Smile, Frown, Meh, Thermometer, Activity, Sparkles, TrendingUp
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type Symptom = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  category: 'physical' | 'emotional' | 'flow';
};

const symptoms: Symptom[] = [
  { id: 'cramps', name: 'Cramps', icon: <Thermometer size={18} />, color: 'bg-red-100 text-red-600 border-red-200', category: 'physical' },
  { id: 'headache', name: 'Headache', icon: <ThermometerSnowflake size={18} />, color: 'bg-blue-100 text-blue-600 border-blue-200', category: 'physical' },
  { id: 'bloating', name: 'Bloating', icon: <FlaskConical size={18} />, color: 'bg-purple-100 text-purple-600 border-purple-200', category: 'physical' },
  { id: 'fatigue', name: 'Fatigue', icon: <Activity size={18} />, color: 'bg-yellow-100 text-yellow-600 border-yellow-200', category: 'physical' },
  { id: 'mood_swings', name: 'Mood Swings', icon: <Meh size={18} />, color: 'bg-green-100 text-green-600 border-green-200', category: 'emotional' },
  { id: 'breast_tenderness', name: 'Tender Breasts', icon: <Heart size={18} />, color: 'bg-pink-100 text-pink-600 border-pink-200', category: 'physical' },
  { id: 'happy', name: 'Happy', icon: <Smile size={18} />, color: 'bg-amber-100 text-amber-600 border-amber-200', category: 'emotional' },
  { id: 'sad', name: 'Sad', icon: <Frown size={18} />, color: 'bg-indigo-100 text-indigo-600 border-indigo-200', category: 'emotional' },
  { id: 'flow_light', name: 'Light Flow', icon: <Droplets size={18} />, color: 'bg-teal-100 text-teal-600 border-teal-200', category: 'flow' },
  { id: 'flow_heavy', name: 'Heavy Flow', icon: <Droplets size={18} />, color: 'bg-rose-100 text-rose-600 border-rose-200', category: 'flow' },
];

const SymptomTracker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      setSaved(false);
    }
  }, [selectedSymptoms]);

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const handleSave = () => {
    toast({
      title: "Symptoms Logged Successfully! ✨",
      description: "Your symptoms have been recorded. Great job tracking your health!",
    });
    setSaved(true);
    setShowInsights(true);
  };

  const getInsightMessage = () => {
    const physicalSymptoms = selectedSymptoms.filter(id => 
      symptoms.find(s => s.id === id)?.category === 'physical'
    ).length;
    
    const emotionalSymptoms = selectedSymptoms.filter(id => 
      symptoms.find(s => s.id === id)?.category === 'emotional'
    ).length;

    if (selectedSymptoms.includes('happy')) {
      return "You're feeling happy today! 😊 That's wonderful - your positive energy is shining through!";
    }
    
    if (physicalSymptoms > 2) {
      return "You're experiencing several physical symptoms. Remember to be gentle with yourself and rest when needed. 💖";
    }
    
    if (emotionalSymptoms > 0) {
      return "Your emotional awareness is impressive! Tracking feelings helps you understand your patterns better. 🌟";
    }
    
    return "Every symptom you track helps you understand your unique cycle better. You're doing amazing! ✨";
  };

  const getCategoryCount = (category: 'physical' | 'emotional' | 'flow') => {
    return selectedSymptoms.filter(id => 
      symptoms.find(s => s.id === id)?.category === category
    ).length;
  };

  return (
    <Card className="bg-white border-0 shadow-xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-empowher-light/30 to-purple-100/30">
        <CardTitle className="text-xl flex items-center">
          <Activity className="mr-3 h-6 w-6 text-empowher-primary animate-pulse" />
          <div>
            <div className="text-lg font-bold">How are you feeling today?</div>
            <div className="text-sm text-empowher-text/60 font-normal">Track your symptoms to understand your body better</div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Category Headers */}
        <div className="space-y-6">
          {/* Physical Symptoms */}
          <div>
            <h3 className="text-sm font-semibold text-empowher-text/80 mb-3 flex items-center">
              <Thermometer className="h-4 w-4 mr-2" />
              Physical ({getCategoryCount('physical')})
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {symptoms.filter(s => s.category === 'physical').map((symptom) => (
                <Button
                  key={symptom.id}
                  variant="ghost"
                  className={`flex flex-col items-center justify-center h-20 p-2 border-2 rounded-xl transition-all duration-300 ${
                    selectedSymptoms.includes(symptom.id)
                      ? `${symptom.color} scale-105 shadow-lg`
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-105'
                  }`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  <div className="mb-1 transform transition-transform duration-200">
                    {symptom.icon}
                  </div>
                  <span className="text-xs text-center leading-tight">{symptom.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Emotional Symptoms */}
          <div>
            <h3 className="text-sm font-semibold text-empowher-text/80 mb-3 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Emotional ({getCategoryCount('emotional')})
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {symptoms.filter(s => s.category === 'emotional').map((symptom) => (
                <Button
                  key={symptom.id}
                  variant="ghost"
                  className={`flex flex-col items-center justify-center h-20 p-2 border-2 rounded-xl transition-all duration-300 ${
                    selectedSymptoms.includes(symptom.id)
                      ? `${symptom.color} scale-105 shadow-lg`
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-105'
                  }`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  <div className="mb-1 transform transition-transform duration-200">
                    {symptom.icon}
                  </div>
                  <span className="text-xs text-center leading-tight">{symptom.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Flow Symptoms */}
          <div>
            <h3 className="text-sm font-semibold text-empowher-text/80 mb-3 flex items-center">
              <Droplets className="h-4 w-4 mr-2" />
              Flow ({getCategoryCount('flow')})
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {symptoms.filter(s => s.category === 'flow').map((symptom) => (
                <Button
                  key={symptom.id}
                  variant="ghost"
                  className={`flex flex-col items-center justify-center h-20 p-2 border-2 rounded-xl transition-all duration-300 ${
                    selectedSymptoms.includes(symptom.id)
                      ? `${symptom.color} scale-105 shadow-lg`
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-105'
                  }`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  <div className="mb-1 transform transition-transform duration-200">
                    {symptom.icon}
                  </div>
                  <span className="text-xs text-center leading-tight">{symptom.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Section */}
        {showInsights && selectedSymptoms.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-empowher-light/50 to-purple-100/50 rounded-xl border border-purple-200 animate-fade-in">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-empowher-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-empowher-text mb-1">Your Insight</h4>
                <p className="text-sm text-empowher-text/80">{getInsightMessage()}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            onClick={handleSave}
            className={`w-full py-3 transition-all duration-300 ${
              saved 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 shadow-lg' 
                : 'bg-gradient-to-r from-empowher-primary to-empowher-secondary hover:from-empowher-secondary hover:to-empowher-tertiary shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
            }`}
            disabled={selectedSymptoms.length === 0}
          >
            <div className="flex items-center justify-center gap-2">
              {saved ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Logged Successfully!</span>
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4" />
                  <span>Log My Symptoms</span>
                </>
              )}
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SymptomTracker;
