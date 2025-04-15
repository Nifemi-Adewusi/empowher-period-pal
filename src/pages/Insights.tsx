import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Calendar, Droplets } from 'lucide-react';
import { analyzeSymptoms, type SymptomLog } from '@/utils/symptomAnalyzer';
import PersonalizedInsights from '@/components/PersonalizedInsights';

const Insights = () => {
  const { userData } = useUser();

  // For now, using sample data - in a real app, this would come from your symptom tracking storage
  const sampleSymptomLogs: SymptomLog[] = [
    { date: new Date(), symptoms: ['cramps', 'headache'] },
    { date: new Date(Date.now() - 86400000), symptoms: ['cramps', 'fatigue'] },
    { date: new Date(Date.now() - 86400000 * 2), symptoms: ['cramps', 'bloating'] },
  ];

  const insights = analyzeSymptoms(sampleSymptomLogs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-empowher-light/30 pb-16">
      <div className="bg-white shadow-sm">
        <div className="container max-w-md mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-empowher-text">Insights</h1>
          <p className="text-sm text-empowher-text/60 mt-1">Your personalized health analysis</p>
        </div>
      </div>

      <div className="container max-w-md mx-auto px-4 py-4 space-y-6">
        {/* Personalized Insights Section */}
        <PersonalizedInsights insights={insights} />

        {/* Cycle Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-empowher-primary" />
              Cycle Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-empowher-primary">
                  {userData?.cycleLength || 28}
                </p>
                <p className="text-xs text-empowher-text/60">Cycle Days</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-empowher-primary">
                  {userData?.periodLength || 5}
                </p>
                <p className="text-xs text-empowher-text/60">Period Days</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-empowher-primary">
                  {userData?.lastPeriod ? 'Regular' : '-'}
                </p>
                <p className="text-xs text-empowher-text/60">Cycle Type</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Symptom Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-empowher-primary" />
              Symptom Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleSymptomLogs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cramps" fill="#F472B6" name="Cramps" />
                  <Bar dataKey="mood" fill="#60A5FA" name="Mood" />
                  <Bar dataKey="flow" fill="#4F46E5" name="Flow" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Flow Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-empowher-primary" />
              Flow Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-empowher-text/80">
              Track your flow patterns over time to better understand your cycle.
              Start logging your symptoms daily for personalized insights.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
