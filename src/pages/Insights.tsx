
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Activity, Calendar, Droplets, TrendingUp, Heart, Sparkles, Crown, Zap, Star, Brain, Target, Award } from 'lucide-react';

const Insights = () => {
  const { userData } = useUser();
  const [activeChart, setActiveChart] = useState('symptoms');
  const [showMagic, setShowMagic] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(0);

  const insights = [
    "Your cycle is perfectly unique to you! 🌟",
    "Every phase brings its own superpowers ✨",
    "You're tracking like a wellness goddess! 💪",
    "Your patterns tell a beautiful story 🦋",
    "Knowledge is power - you're unstoppable! 👑"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowMagic(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced sample data with more variety
  const symptomData = [
    { day: 'Day 1', cramps: 3, mood: 2, flow: 4, energy: 2 },
    { day: 'Day 2', cramps: 4, mood: 3, flow: 5, energy: 3 },
    { day: 'Day 3', cramps: 2, mood: 4, flow: 3, energy: 4 },
    { day: 'Day 4', cramps: 1, mood: 4, flow: 2, energy: 5 },
    { day: 'Day 5', cramps: 0, mood: 5, flow: 1, energy: 5 },
    { day: 'Day 6', cramps: 0, mood: 4, flow: 0, energy: 4 },
    { day: 'Day 7', cramps: 0, mood: 5, flow: 0, energy: 5 },
  ];

  const moodTrendData = [
    { week: 'Week 1', happiness: 85, energy: 70, confidence: 80 },
    { week: 'Week 2', happiness: 90, energy: 85, confidence: 88 },
    { week: 'Week 3', happiness: 75, energy: 60, confidence: 70 },
    { week: 'Week 4', happiness: 95, energy: 90, confidence: 95 },
  ];

  const cycleDistribution = [
    { name: 'Period', value: 20, color: '#F472B6' },
    { name: 'Fertile', value: 25, color: '#A855F7' },
    { name: 'Luteal', value: 35, color: '#60A5FA' },
    { name: 'Follicular', value: 20, color: '#34D399' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 pb-16 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {i % 4 === 0 ? <Brain className="h-6 w-6 text-purple-400" /> : 
             i % 4 === 1 ? <Target className="h-6 w-6 text-pink-400" /> : 
             i % 4 === 2 ? <Award className="h-6 w-6 text-blue-400" /> :
             <Zap className="h-6 w-6 text-yellow-400" />}
          </div>
        ))}
      </div>

      {/* Magical Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30"></div>
        <div className="container max-w-md mx-auto px-4 py-8 relative">
          <div className={`text-center transition-all duration-1000 ${showMagic ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <TrendingUp className="h-10 w-10 mr-3 animate-pulse" />
                <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300 animate-spin" />
              </div>
              <h1 className="text-3xl font-bold">Your Insights</h1>
              <Crown className="h-8 w-8 ml-3 text-yellow-300 animate-bounce" />
            </div>
            <p className="text-white/90 text-lg animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {insights[currentInsight]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-md mx-auto px-4 py-4 space-y-6">
        {/* Stats Overview with Animation */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="h-6 w-6 text-empowher-primary animate-pulse" />
              Cycle Overview
              <Star className="h-5 w-5 text-yellow-500 animate-spin" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2 p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 transition-all duration-300 hover:scale-110">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-pink-600 mr-1" />
                  <p className="text-2xl font-bold text-empowher-primary">
                    {userData?.cycleLength || 28}
                  </p>
                </div>
                <p className="text-xs text-empowher-text/70 font-semibold">Cycle Days</p>
                <div className="text-lg">🌙</div>
              </div>
              <div className="space-y-2 p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 hover:from-purple-200 hover:to-violet-200 transition-all duration-300 hover:scale-110">
                <div className="flex items-center justify-center mb-2">
                  <Droplets className="h-5 w-5 text-purple-600 mr-1" />
                  <p className="text-2xl font-bold text-empowher-primary">
                    {userData?.periodLength || 5}
                  </p>
                </div>
                <p className="text-xs text-empowher-text/70 font-semibold">Period Days</p>
                <div className="text-lg">🌹</div>
              </div>
              <div className="space-y-2 p-4 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 transition-all duration-300 hover:scale-110">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-5 w-5 text-green-600 mr-1 animate-pulse" />
                  <p className="text-2xl font-bold text-empowher-primary">
                    {userData?.lastPeriod ? 'Perfect' : 'Starting'}
                  </p>
                </div>
                <p className="text-xs text-empowher-text/70 font-semibold">Cycle Health</p>
                <div className="text-lg">✨</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Chart Selector */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4">
            <div className="flex space-x-2 mb-4">
              {[
                { id: 'symptoms', label: 'Symptoms', icon: Activity },
                { id: 'mood', label: 'Mood', icon: Heart },
                { id: 'cycle', label: 'Cycle', icon: Droplets }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveChart(id)}
                  className={`flex-1 p-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeChart === id
                      ? 'bg-gradient-to-r from-empowher-primary to-empowher-secondary text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Charts */}
        {activeChart === 'symptoms' && (
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-empowher-primary animate-pulse" />
                Symptom Trends
                <Zap className="h-4 w-4 text-yellow-500 animate-bounce" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={symptomData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Bar dataKey="cramps" fill="#F472B6" name="Cramps" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="mood" fill="#A855F7" name="Mood" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="flow" fill="#60A5FA" name="Flow" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="energy" fill="#34D399" name="Energy" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {activeChart === 'mood' && (
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
                Mood Journey
                <Sparkles className="h-4 w-4 text-purple-500 animate-spin" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Line type="monotone" dataKey="happiness" stroke="#F472B6" strokeWidth={3} dot={{ fill: '#F472B6', strokeWidth: 2, r: 6 }} />
                    <Line type="monotone" dataKey="energy" stroke="#A855F7" strokeWidth={3} dot={{ fill: '#A855F7', strokeWidth: 2, r: 6 }} />
                    <Line type="monotone" dataKey="confidence" stroke="#60A5FA" strokeWidth={3} dot={{ fill: '#60A5FA', strokeWidth: 2, r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {activeChart === 'cycle' && (
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Droplets className="h-5 w-5 text-empowher-primary animate-bounce" />
                Cycle Distribution
                <Crown className="h-4 w-4 text-yellow-500 animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cycleDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {cycleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {cycleDistribution.map((item) => (
                  <div key={item.name} className="flex items-center p-2 rounded-lg bg-gray-50">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personalized Insights */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-100 to-pink-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-purple-600 animate-pulse" />
              Your Personal Insights
              <Star className="h-4 w-4 text-yellow-500 animate-spin" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-semibold text-green-700">Pattern Recognition</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your energy levels peak during days 6-7 of your cycle. This is your power window! 💪
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-semibold text-blue-700">Achievement Unlocked</span>
                </div>
                <p className="text-sm text-gray-600">
                  You've tracked 7 consecutive days! You're building amazing self-awareness habits. 🏆
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-5 w-5 text-purple-500 mr-2 animate-spin" />
                  <span className="font-semibold text-purple-700">Wellness Tip</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your mood tends to improve with consistent tracking. Keep up the amazing work! ✨
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empowerment Section */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 text-white animate-fade-in overflow-hidden" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 opacity-20"></div>
          <CardContent className="p-6 text-center relative">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-8 w-8 text-yellow-300 animate-bounce mr-2" />
              <h3 className="text-2xl font-bold">You're Amazing!</h3>
              <Crown className="h-8 w-8 text-yellow-300 animate-bounce ml-2" />
            </div>
            <p className="text-white/90 text-lg mb-4">
              Every insight you gain is a step towards understanding your incredible body and mind. 
            </p>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-300 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
