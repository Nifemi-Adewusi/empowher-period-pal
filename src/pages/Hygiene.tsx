import React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const Hygiene = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-empowher-light/20 to-background pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-empowher-primary/10 via-empowher-secondary/10 to-empowher-primary/10 border-b border-empowher-light/30 backdrop-blur-sm mb-8">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/80 rounded-2xl shadow-md">
              <Sparkles className="h-6 w-6 text-empowher-primary" />
            </div>
            <h1 className="text-3xl font-bold text-empowher-text bg-gradient-to-r from-empowher-primary to-empowher-secondary bg-clip-text text-transparent">
              Hygiene Hub
            </h1>
          </div>
          <p className="text-empowher-text/70 ml-16">Your comprehensive guide to healthy period practices</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container max-w-3xl mx-auto px-4">
        <div className="space-y-6">
          {/* Section 1: How to Dispose of Pads Properly */}
          <Card className="bg-gradient-to-br from-white to-empowher-light/10 shadow-xl border-empowher-light/40 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-empowher-primary/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-empowher-primary" />
                </div>
                <h2 className="text-xl font-semibold text-empowher-text">How to Dispose of Pads Properly</h2>
              </div>
              
              <div className="space-y-5">
                <div className="bg-gradient-to-r from-empowher-light/20 to-transparent p-4 rounded-lg border-l-4 border-empowher-primary">
                  <p className="font-semibold text-empowher-text mb-2">Step 1: Wrap it up</p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    Wrap your used pad in its original wrapper (if available) or in toilet paper. This contains odors and keeps things hygienic.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-empowher-light/20 to-transparent p-4 rounded-lg border-l-4 border-empowher-secondary">
                  <p className="font-semibold text-empowher-text mb-2">Step 2: Use the bin</p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    Place the wrapped pad in a designated waste bin. Most bathrooms have a small bin specifically for sanitary products.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-empowher-light/20 to-transparent p-4 rounded-lg border-l-4 border-empowher-accent">
                  <p className="font-semibold text-empowher-text mb-2">Step 3: Never flush</p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    Never flush pads down the toilet. Pads don't dissolve and can cause serious plumbing blockages and environmental damage.
                  </p>
                </div>

                <div className="mt-6 bg-gradient-to-br from-empowher-primary/5 via-empowher-secondary/5 to-empowher-accent/5 p-5 rounded-xl border border-empowher-primary/20">
                  <p className="text-sm text-empowher-text/90 italic leading-relaxed">
                    💚 Taking proper care of disposal is a simple way to care for yourself and the environment. You're doing great!
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Helpful Disposal Tips */}
          <Card className="bg-gradient-to-br from-white to-empowher-secondary/5 shadow-xl border-empowher-light/40 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-empowher-secondary/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-empowher-secondary" />
                </div>
                <h2 className="text-xl font-semibold text-empowher-text">Helpful Disposal Tips</h2>
              </div>
              
              <div className="grid gap-4">
                {[
                  "Carry small disposal bags in your purse or backpack for public restrooms that don't have bins",
                  "If no bin is available, wrap thoroughly and dispose in a regular trash can when you find one",
                  "Empty your bathroom waste bin regularly (every 2-3 days) to maintain hygiene and prevent odors",
                  "Consider using scented disposal bags or keeping baking soda nearby to absorb any odors",
                  "Eco-friendly option: Look for biodegradable disposal bags to reduce environmental impact"
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-empowher-light/10 to-transparent rounded-lg hover:from-empowher-light/20 transition-colors duration-200">
                    <div className="p-1.5 bg-empowher-secondary/10 rounded-full flex-shrink-0 mt-0.5">
                      <Sparkles className="text-empowher-secondary h-4 w-4" />
                    </div>
                    <span className="text-sm text-empowher-text/80 leading-relaxed">
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Section 3: When to Change Your Pad */}
          <Card className="bg-gradient-to-br from-white to-empowher-accent/5 shadow-xl border-empowher-light/40 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-empowher-accent/10 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-empowher-accent" />
                </div>
                <h2 className="text-xl font-semibold text-empowher-text">When to Change Your Pad</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50/50 to-transparent rounded-lg border-l-3 border-blue-400">
                  <p className="font-semibold text-empowher-text mb-2">⏰ General guideline</p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    Change your pad every 4-6 hours, even if it doesn't seem full. This prevents bacterial growth and keeps you feeling fresh.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-rose-50/50 to-transparent rounded-lg border-l-3 border-rose-400">
                  <p className="font-semibold text-empowher-text mb-2">🌊 Heavy flow</p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    On heavy flow days, you may need to change every 2-3 hours. Listen to your body and change when you feel uncomfortable.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-pink-50/50 to-transparent rounded-lg border-l-3 border-pink-400">
                  <p className="font-semibold text-empowher-text mb-2">🌸 Light flow</p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    On lighter days, every 4-6 hours is usually sufficient, but change sooner if you notice any odor or discomfort.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50/50 to-transparent rounded-lg border-l-3 border-purple-400">
                  <p className="font-semibold text-empowher-text mb-2">🌙 Overnight</p>
                  <p className="text-sm text-empowher-text/80 leading-relaxed">
                    Use overnight pads designed for longer wear (up to 8 hours) and change immediately upon waking.
                  </p>
                </div>

                <div className="mt-6 bg-gradient-to-r from-orange-50 via-amber-50/50 to-yellow-50/30 border-2 border-orange-200 p-5 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                      <AlertCircle className="text-orange-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-orange-900 mb-2">⚠️ When to see a doctor</p>
                      <span className="text-sm text-orange-800/90 leading-relaxed">
                        If you need to change more frequently than every 2 hours, or soak through pads very quickly, consult a healthcare provider as this could indicate heavy menstrual bleeding.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hygiene;
