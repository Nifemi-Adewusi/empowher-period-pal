
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Calendar, Droplets } from 'lucide-react';

const Insights = () => {
  const { userData } = useUser();

  // Sample data - in a real app, this would come from stored symptom history
  const sampleSymptomData = [
    { day: 'Day 1', cramps: 3, mood: 2, flow: 4 },
    { day: 'Day 2', cramps: 4, mood: 3, flow: 5 },
    { day: 'Day 3', cramps: 2, mood: 4, flow: 3 },
    { day: 'Day 4', cramps: 1, mood: 4, flow: 2 },
    { day: 'Day 5', cramps: 0, mood: 5, flow: 1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-empowher-light/30 pb-16">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container max-w-md mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-empowher-text">Insights</h1>
          <p className="text-sm text-empowher-text/60 mt-1">Track your patterns and cycles</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-md mx-auto px-4 py-4 space-y-6">
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
                <BarChart data={sampleSymptomData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
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
