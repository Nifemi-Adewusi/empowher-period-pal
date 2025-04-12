
import React, { useState } from 'react';
import { Heart, ThumbsUp, X, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

type Tip = {
  id: string;
  title: string;
  content: string;
  source: string;
  category: 'cramps' | 'mood' | 'energy' | 'sleep' | 'general';
};

const periodTips: Tip[] = [
  {
    id: '1',
    title: 'Heat Therapy for Cramps',
    content: 'Apply a heating pad, hot water bottle, or warm towel to your lower abdomen or back to help relax the muscles and reduce cramping. Research shows that heat therapy can be as effective as over-the-counter pain medications.',
    source: 'Journal of Physiotherapy',
    category: 'cramps'
  },
  {
    id: '2',
    title: 'Anti-inflammatory Foods',
    content: 'Incorporate anti-inflammatory foods like leafy greens, berries, fatty fish, and nuts into your diet. These foods contain omega-3 fatty acids and antioxidants that may help reduce inflammation and period pain.',
    source: 'American Journal of Clinical Nutrition',
    category: 'cramps'
  },
  {
    id: '3',
    title: 'Gentle Exercise',
    content: 'Light exercises like walking, stretching, or yoga can increase blood flow and release endorphins, which can help alleviate menstrual pain. Focus on gentle movements rather than intense workouts.',
    source: 'Journal of Physical Therapy Science',
    category: 'energy'
  },
  {
    id: '4',
    title: 'Stay Hydrated',
    content: 'Drinking plenty of water can help reduce bloating and alleviate cramps. Aim for at least 8 glasses of water throughout the day, and consider warm herbal teas like chamomile or ginger for additional benefits.',
    source: 'International Journal of Nursing Studies',
    category: 'general'
  },
  {
    id: '5',
    title: 'Magnesium-Rich Foods',
    content: 'Foods rich in magnesium like dark chocolate, bananas, avocados, and nuts may help reduce menstrual cramps and improve mood. Magnesium helps relax muscles and regulates neurotransmitters that reduce pain.',
    source: 'American Journal of Obstetrics and Gynecology',
    category: 'mood'
  },
  {
    id: '6',
    title: 'Sleep Position Matters',
    content: 'Try sleeping in the fetal position with your knees tucked into your chest to reduce pressure on your abdominal muscles, potentially easing cramps. A pillow between your knees can also help align your hips and reduce back strain.',
    source: 'Journal of Sleep Research',
    category: 'sleep'
  },
  {
    id: '7',
    title: 'Mindfulness and Relaxation',
    content: 'Practice deep breathing, meditation, or progressive muscle relaxation to help manage period pain and reduce stress. Studies show that these techniques can help modulate pain perception and reduce anxiety.',
    source: 'Journal of Alternative and Complementary Medicine',
    category: 'mood'
  },
  {
    id: '8',
    title: 'Acupressure Points',
    content: 'Try applying pressure to specific points on your body, such as four finger widths below your belly button or the fleshy part between your thumb and index finger, for 1-3 minutes to potentially relieve cramps.',
    source: 'Evidence-Based Complementary and Alternative Medicine',
    category: 'cramps'
  }
];

type TipsProps = {
  category?: 'cramps' | 'mood' | 'energy' | 'sleep' | 'general';
};

const Tips: React.FC<TipsProps> = ({ category = 'general' }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [savedTips, setSavedTips] = useState<string[]>([]);
  const { toast } = useToast();

  // Filter tips by category if provided
  const filteredTips = category === 'general' 
    ? periodTips 
    : periodTips.filter(tip => tip.category === category);
  
  const currentTip = filteredTips[currentTipIndex % filteredTips.length];

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % filteredTips.length);
  };

  const handleSaveTip = () => {
    if (!savedTips.includes(currentTip.id)) {
      setSavedTips([...savedTips, currentTip.id]);
      toast({
        title: "Tip Saved!",
        description: "You can find this in your saved tips collection.",
      });
    } else {
      setSavedTips(savedTips.filter(id => id !== currentTip.id));
      toast({
        title: "Tip Removed",
        description: "This tip has been removed from your saved collection.",
      });
    }
  };

  const isSaved = savedTips.includes(currentTip.id);

  return (
    <Card className="w-full overflow-hidden shadow-lg border-empowher-light">
      <CardHeader className="bg-empowher-primary/10 pb-2">
        <CardTitle className="flex items-center text-empowher-primary">
          <Heart className="mr-2 h-5 w-5" />
          Period Wellness Tip
        </CardTitle>
        <CardDescription>Research-backed advice to feel better</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-2">{currentTip.title}</h3>
        <p className="text-empowher-text/80">{currentTip.content}</p>
        <p className="text-xs text-empowher-text/60 mt-3">Source: {currentTip.source}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-empowher-primary hover:bg-empowher-light/50"
          onClick={handleSaveTip}
        >
          {isSaved ? (
            <>
              <X className="mr-1 h-4 w-4" />
              Unsave
            </>
          ) : (
            <>
              <ThumbsUp className="mr-1 h-4 w-4" />
              Save Tip
            </>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-empowher-primary hover:bg-empowher-light/50"
          onClick={handleNextTip}
        >
          Next Tip
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Tips;
