
import React, { useState } from 'react';
import { Heart, ThumbsUp, X, ChevronRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

type Tip = {
  id: string;
  title: string;
  content: string;
  source: string;
  category: 'cramps' | 'mood' | 'energy' | 'sleep' | 'general';
  empathyNote: string;
};

const periodTips: Tip[] = [
  {
    id: '1',
    title: 'Gentle Heat Therapy for Comfort',
    content: 'Apply a heating pad, hot water bottle, or warm towel to your lower abdomen or back. The warmth helps relax your muscles and can provide the gentle relief you deserve. Research shows heat therapy can be as effective as pain medications.',
    source: 'Journal of Physiotherapy',
    category: 'cramps',
    empathyNote: 'Your pain is real and valid. You deserve comfort and relief. 💕'
  },
  {
    id: '2',
    title: 'Nourishing Anti-inflammatory Foods',
    content: 'Be kind to your body with healing foods like leafy greens, berries, fatty fish, and nuts. These contain omega-3s and antioxidants that work gently to reduce inflammation and support your body through this time.',
    source: 'American Journal of Clinical Nutrition',
    category: 'cramps',
    empathyNote: 'Nourishing yourself is an act of self-love. You deserve to feel good from the inside out. 🌿'
  },
  {
    id: '3',
    title: 'Movement That Feels Good',
    content: 'Listen to your body and try gentle movements like slow walks, soft stretching, or restorative yoga. Movement releases natural feel-good chemicals and can ease discomfort when done with love and patience.',
    source: 'Journal of Physical Therapy Science',
    category: 'energy',
    empathyNote: 'Honor what your body needs today. Some days it\'s rest, some days it\'s gentle movement. Both are perfect. ✨'
  },
  {
    id: '4',
    title: 'Hydration as Self-Care',
    content: 'Drinking plenty of water is like giving your body a gentle hug from the inside. Aim for 8 glasses throughout the day, and try warm herbal teas like chamomile or ginger for extra comfort and bloating relief.',
    source: 'International Journal of Nursing Studies',
    category: 'general',
    empathyNote: 'Taking care of your basic needs is a beautiful way to show yourself love. You\'re worth this care. 💧'
  },
  {
    id: '5',
    title: 'Magnesium-Rich Comfort Foods',
    content: 'Treat yourself gently with magnesium-rich foods like dark chocolate (yes, chocolate!), bananas, avocados, and nuts. These natural mood-boosters help relax muscles and calm your nervous system.',
    source: 'American Journal of Obstetrics and Gynecology',
    category: 'mood',
    empathyNote: 'Your cravings often tell you what your body needs. Trust yourself and enjoy nourishing treats guilt-free. 🍫'
  },
  {
    id: '6',
    title: 'Restful Sleep Positions',
    content: 'Try curling up in the fetal position with your knees gently tucked toward your chest, or place a soft pillow between your knees. These positions can ease pressure and help you find the rest you so deeply deserve.',
    source: 'Journal of Sleep Research',
    category: 'sleep',
    empathyNote: 'Quality rest is not selfish - it\'s necessary. Your body is working hard and needs this recovery time. 🌙'
  },
  {
    id: '7',
    title: 'Mindful Breathing and Calm',
    content: 'When overwhelm hits, try deep, slow breathing, gentle meditation, or progressive muscle relaxation. These practices help your nervous system find calm and can significantly reduce both physical and emotional pain.',
    source: 'Journal of Alternative and Complementary Medicine',
    category: 'mood',
    empathyNote: 'Your mental health matters just as much as your physical health. Taking time to breathe is taking time to heal. 🌸'
  },
  {
    id: '8',
    title: 'Gentle Acupressure Relief',
    content: 'Try applying gentle pressure to the spot four finger widths below your belly button, or massage the soft area between your thumb and index finger for 1-3 minutes. These ancient techniques can offer natural comfort.',
    source: 'Evidence-Based Complementary and Alternative Medicine',
    category: 'cramps',
    empathyNote: 'Your body has amazing healing wisdom. Sometimes the gentlest touch can bring the greatest relief. 🤲'
  },
  {
    id: '9',
    title: 'Emotional Permission Slip',
    content: 'It\'s completely normal to feel more sensitive, emotional, or overwhelmed during your cycle. Your hormones are doing important work, and your feelings are valid. Allow yourself to feel without judgment.',
    source: 'Psychological Research',
    category: 'mood',
    empathyNote: 'You\'re not "too much" or "too sensitive." You\'re human, and your emotions deserve respect and care. 💝'
  },
  {
    id: '10',
    title: 'Creating Your Comfort Sanctuary',
    content: 'Make your space as cozy as possible - soft blankets, dimmed lights, your favorite tea, calming scents. Your environment can be a powerful tool for healing and comfort during difficult days.',
    source: 'Environmental Psychology',
    category: 'general',
    empathyNote: 'You deserve a space that feels safe and nurturing. Creating comfort for yourself is an act of radical self-love. 🏡'
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
        title: "Tip Saved with Love! 💕",
        description: "You can find this gentle reminder in your saved collection.",
      });
    } else {
      setSavedTips(savedTips.filter(id => id !== currentTip.id));
      toast({
        title: "Tip Removed",
        description: "This tip has been removed from your collection.",
      });
    }
  };

  const isSaved = savedTips.includes(currentTip.id);

  return (
    <Card className="w-full overflow-hidden shadow-lg border-empowher-light bg-gradient-to-br from-white to-pink-50/30">
      <CardHeader className="bg-gradient-to-r from-empowher-primary/10 to-pink-100/50 pb-3">
        <CardTitle className="flex items-center text-empowher-primary">
          <Heart className="mr-2 h-5 w-5 animate-pulse" />
          Gentle Care & Comfort Tips
        </CardTitle>
        <CardDescription className="text-empowher-text/70">
          Research-backed advice wrapped in love and understanding 💝
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-lg font-semibold mb-3 text-empowher-primary">{currentTip.title}</h3>
        <p className="text-empowher-text/80 leading-relaxed">{currentTip.content}</p>
        
        {/* Empathy Note */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border-l-4 border-pink-300">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-empowher-text/90 italic font-medium">
              {currentTip.empathyNote}
            </p>
          </div>
        </div>
        
        <p className="text-xs text-empowher-text/60 mt-3">
          <strong>Backed by research:</strong> {currentTip.source}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between bg-gradient-to-r from-pink-50/30 to-purple-50/30">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-empowher-primary hover:bg-empowher-light/50 transition-all hover:scale-105"
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
              Save This Love
            </>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-empowher-primary hover:bg-empowher-light/50 transition-all hover:scale-105"
          onClick={handleNextTip}
        >
          More Care Tips
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Tips;
