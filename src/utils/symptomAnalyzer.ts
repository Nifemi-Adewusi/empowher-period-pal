
import { format, sub } from 'date-fns';

export type SymptomLog = {
  date: Date;
  symptoms: string[];
};

export type Insight = {
  type: 'info' | 'warning' | 'tip';
  title: string;
  description: string;
};

export const analyzeSymptoms = (recentLogs: SymptomLog[]): Insight[] => {
  const insights: Insight[] = [];
  
  // Get symptoms from the last 7 days
  const lastWeekLogs = recentLogs.filter(log => 
    log.date >= sub(new Date(), { days: 7 })
  );
  
  // Check for frequent symptoms
  const symptomCounts = lastWeekLogs.reduce((acc, log) => {
    log.symptoms.forEach(symptom => {
      acc[symptom] = (acc[symptom] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  // Generate insights based on symptom patterns
  Object.entries(symptomCounts).forEach(([symptom, count]) => {
    if (count >= 3) {
      insights.push(generateInsightForSymptom(symptom, count));
    }
  });
  
  return insights;
};

const generateInsightForSymptom = (symptom: string, frequency: number): Insight => {
  const insights: Record<string, Insight> = {
    cramps: {
      type: 'tip',
      title: 'Managing Frequent Cramps',
      description: 'Try using a heating pad and gentle exercise to help relieve menstrual cramps. Consider tracking when they occur most during your cycle.'
    },
    headache: {
      type: 'info',
      title: 'Headache Pattern Detected',
      description: 'Headaches might be hormone-related. Stay hydrated and consider tracking potential triggers like caffeine or stress.'
    },
    mood_swings: {
      type: 'info',
      title: 'Mood Changes Observed',
      description: 'Your mood changes might be linked to hormonal fluctuations. Consider stress-reducing activities like meditation or gentle exercise.'
    },
    fatigue: {
      type: 'tip',
      title: 'Managing Energy Levels',
      description: 'Try adjusting your sleep schedule and including iron-rich foods in your diet. Consider checking iron levels with your healthcare provider.'
    },
    bloating: {
      type: 'tip',
      title: 'Reducing Bloating',
      description: 'Consider reducing salt intake and increasing water consumption. Light exercise might help reduce bloating symptoms.'
    }
  };

  return insights[symptom] || {
    type: 'info',
    title: `Frequent ${symptom}`,
    description: `You've experienced ${symptom} ${frequency} times in the past week. Consider discussing this pattern with your healthcare provider.`
  };
};
