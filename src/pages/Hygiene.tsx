import React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const Hygiene = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-empowher-light/30 pb-20">
      {/* Header Section */}
      <div className="bg-white shadow-sm mb-6">
        <div className="container max-w-md mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-empowher-text">🌸 Hygiene Hub</h1>
          <p className="text-sm text-empowher-text/60 mt-1">Your guide to healthy period practices</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container max-w-md mx-auto px-4">
        <Card className="bg-gradient-to-br from-white to-pink-50/30 shadow-lg border-empowher-light overflow-hidden">
          <Accordion type="multiple" className="w-full">
            {/* Section 1: How to Dispose of Pads Properly */}
            <AccordionItem value="disposal-steps">
              <AccordionTrigger>How to Dispose of Pads Properly</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    <strong>Step 1:</strong> Wrap your used pad in its original wrapper (if available) or in toilet paper. This contains odors and keeps things hygienic.
                  </p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    <strong>Step 2:</strong> Place the wrapped pad in a designated waste bin. Most bathrooms have a small bin specifically for sanitary products.
                  </p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    <strong>Step 3:</strong> Never flush pads down the toilet. Pads don't dissolve and can cause serious plumbing blockages and environmental damage.
                  </p>
                  <div className="mt-4 bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-pink-300 p-4 rounded">
                    <p className="text-sm text-empowher-text/90 italic">
                      Taking proper care of disposal is a simple way to care for yourself and the environment. You're doing great! 🌱
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Helpful Disposal Tips */}
            <AccordionItem value="disposal-tips">
              <AccordionTrigger>Helpful Disposal Tips</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-empowher-primary h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-empowher-text/80 leading-relaxed">
                      Carry small disposal bags in your purse or backpack for public restrooms that don't have bins
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-empowher-primary h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-empowher-text/80 leading-relaxed">
                      If no bin is available, wrap thoroughly and dispose in a regular trash can when you find one
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-empowher-primary h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-empowher-text/80 leading-relaxed">
                      Empty your bathroom waste bin regularly (every 2-3 days) to maintain hygiene and prevent odors
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-empowher-primary h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-empowher-text/80 leading-relaxed">
                      Consider using scented disposal bags or keeping baking soda nearby to absorb any odors
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-empowher-primary h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-empowher-text/80 leading-relaxed">
                      Eco-friendly option: Look for biodegradable disposal bags to reduce environmental impact
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: When to Change Your Pad */}
            <AccordionItem value="changing-frequency">
              <AccordionTrigger>When to Change Your Pad</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    <strong>General guideline:</strong> Change your pad every 4-6 hours, even if it doesn't seem full. This prevents bacterial growth and keeps you feeling fresh.
                  </p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    <strong>Heavy flow:</strong> On heavy flow days, you may need to change every 2-3 hours. Listen to your body and change when you feel uncomfortable.
                  </p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    <strong>Light flow:</strong> On lighter days, every 4-6 hours is usually sufficient, but change sooner if you notice any odor or discomfort.
                  </p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    <strong>Overnight:</strong> Use overnight pads designed for longer wear (up to 8 hours) and change immediately upon waking.
                  </p>
                  <div className="mt-4 bg-orange-50 border border-orange-200 p-3 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-orange-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm text-empowher-text/90">
                      If you need to change more frequently than every 2 hours, or soak through pads very quickly, consult a healthcare provider as this could indicate heavy menstrual bleeding.
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );
};

export default Hygiene;
