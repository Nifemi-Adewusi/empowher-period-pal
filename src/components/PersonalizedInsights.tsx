
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { Insight } from '@/utils/symptomAnalyzer';

type PersonalizedInsightsProps = {
  insights: Insight[];
};

const PersonalizedInsights: React.FC<PersonalizedInsightsProps> = ({ insights }) => {
  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  if (!insights.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-empowher-primary" />
            Start Logging Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-empowher-text/80">
            Log your symptoms regularly to receive personalized insights and recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getIcon(insight.type)}
              {insight.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-empowher-text/80">{insight.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonalizedInsights;
