
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Droplets, ThermometerSnowflake, Heart, FlaskConical, 
  Smile, Frown, Meh, Thermometer, Activity
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type Symptom = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
};

const symptoms: Symptom[] = [
  { id: 'cramps', name: 'Cramps', icon: <Thermometer size={18} />, color: 'bg-red-100 text-red-600' },
  { id: 'headache', name: 'Headache', icon: <ThermometerSnowflake size={18} />, color: 'bg-blue-100 text-blue-600' },
  { id: 'bloating', name: 'Bloating', icon: <FlaskConical size={18} />, color: 'bg-purple-100 text-purple-600' },
  { id: 'fatigue', name: 'Fatigue', icon: <Activity size={18} />, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'mood_swings', name: 'Mood Swings', icon: <Meh size={18} />, color: 'bg-green-100 text-green-600' },
  { id: 'breast_tenderness', name: 'Breast Tenderness', icon: <Heart size={18} />, color: 'bg-pink-100 text-pink-600' },
  { id: 'happy', name: 'Happy', icon: <Smile size={18} />, color: 'bg-amber-100 text-amber-600' },
  { id: 'sad', name: 'Sad', icon: <Frown size={18} />, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'flow_light', name: 'Light Flow', icon: <Droplets size={18} />, color: 'bg-teal-100 text-teal-600' },
  { id: 'flow_heavy', name: 'Heavy Flow', icon: <Droplets size={18} />, color: 'bg-rose-100 text-rose-600' },
];

const SymptomTracker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Reset saved state when symptoms change
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
    // Here we would typically save the data to a database
    toast({
      title: "Symptoms Logged",
      description: "Your symptoms have been successfully recorded.",
    });
    setSaved(true);
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Activity className="mr-2 h-5 w-5 text-empowher-primary" />
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {symptoms.map((symptom) => (
            <Button
              key={symptom.id}
              variant="ghost"
              className={`flex flex-col items-center justify-center h-16 p-1 border rounded-md transition-colors ${
                selectedSymptoms.includes(symptom.id)
                  ? `${symptom.color} border-current`
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => toggleSymptom(symptom.id)}
            >
              <div className="mb-1">{symptom.icon}</div>
              <span className="text-xs text-center line-clamp-1">{symptom.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-4">
          <Button 
            onClick={handleSave}
            className={`w-full ${
              saved 
                ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                : 'btn-gradient'
            }`}
            disabled={saved || selectedSymptoms.length === 0}
          >
            {saved ? 'Logged Successfully' : 'Log Symptoms'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SymptomTracker;
