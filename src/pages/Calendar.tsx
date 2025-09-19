import React, { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Sparkles,
  Heart,
  Droplets,
  Sun,
  Moon,
  Star,
  Zap,
  Crown,
  Flower,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import { getDayStatus } from "@/utils/periodCalculator";

const Calendar: React.FC = () => {
  const { userData } = useUser();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const [showMagic, setShowMagic] = useState(false);
  const [cycleQuote, setCycleQuote] = useState(
    "Your cycle is your superpower! 🌟"
  );
  const calendarRef = useRef<HTMLDivElement>(null);

  const empoweringQuotes = [
    "Your cycle is your superpower! 🌟",
    "Every phase of your cycle is beautiful ✨",
    "You're a goddess in every season 👑",
    "Your body knows exactly what to do 🌺",
    "Celebrate your amazing feminine energy! 💃",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowMagic(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleQuote(
        empoweringQuotes[Math.floor(Math.random() * empoweringQuotes.length)]
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle click outside to close selected day details
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        selectedDay
      ) {
        console.log("Clicked outside calendar, closing selected day details");
        setSelectedDay(null);
      }
    };

    if (selectedDay) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedDay]);

  if (!userData || !userData.lastPeriod) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-purple-100/50"></div>
          <CardHeader className="text-center pb-8 pt-12 relative">
            <div className="mb-6 flex justify-center">
              <div className="p-6 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full animate-float">
                <CalendarIcon className="h-16 w-16 text-empowher-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
              Your Magical Calendar ✨
            </h2>
            <p className="text-empowher-text/70 text-lg">
              Set up your cycle to unlock the magic of tracking your beautiful
              journey
            </p>
            <div className="mt-6">
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const cycleLength = userData.cycleLength || 28;
  const periodLength = userData.periodLength || 5;

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setSelectedDay(null); // Clear selection when changing months
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setSelectedDay(null); // Clear selection when changing months
  };

  const getDayClass = (day: Date) => {
    if (!userData?.lastPeriod) return "";

    const status = getDayStatus(
      day,
      userData.lastPeriod,
      cycleLength,
      periodLength
    );
    const isSelected = selectedDay && isSameDay(day, selectedDay);

    let baseClasses = "cursor-pointer relative z-10";

    if (status === "onPeriod") {
      baseClasses += isSelected
        ? " bg-gradient-to-br from-rose-600 to-pink-700 text-white shadow-2xl ring-4 ring-pink-300 ring-offset-2"
        : " bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-xl hover:shadow-2xl";
      baseClasses +=
        " transform hover:scale-125 hover:rotate-3 transition-all duration-300";
    } else if (status === "fertile") {
      baseClasses += isSelected
        ? " bg-gradient-to-br from-purple-600 to-violet-700 text-white shadow-2xl ring-4 ring-purple-300 ring-offset-2"
        : " bg-gradient-to-br from-purple-400 to-violet-500 text-white shadow-lg hover:shadow-xl";
      baseClasses +=
        " transform hover:scale-110 hover:-rotate-2 transition-all duration-300";
    } else {
      baseClasses += isSelected
        ? " bg-gradient-to-br from-empowher-primary to-empowher-secondary text-white shadow-xl ring-4 ring-empowher-primary/50 ring-offset-2"
        : " hover:bg-gradient-to-br hover:from-empowher-light/70 hover:to-purple-100/70";
      baseClasses +=
        " hover:scale-110 transform transition-all duration-300 hover:shadow-md";
    }

    return baseClasses;
  };

  const getDayIcon = (day: Date) => {
    if (!userData?.lastPeriod) return null;

    const status = getDayStatus(
      day,
      userData.lastPeriod,
      cycleLength,
      periodLength
    );

    if (status === "onPeriod") {
      return <Droplets className="h-3 w-3 animate-bounce" />;
    }

    if (status === "fertile") {
      return <Sparkles className="h-3 w-3 animate-spin" />;
    }

    if (isSameDay(day, new Date())) {
      return <Crown className="h-3 w-3 text-yellow-500 animate-pulse" />;
    }

    return null;
  };

  const handleDayClick = (day: Date) => {
    console.log("Day clicked:", format(day, "yyyy-MM-dd"));
    setSelectedDay(day);
  };

  const getPhaseMessage = (day: Date) => {
    if (!userData?.lastPeriod) return "";

    const status = getDayStatus(
      day,
      userData.lastPeriod,
      cycleLength,
      periodLength
    );

    switch (status) {
      case "onPeriod":
        return "Period Day - You're a warrior goddess! 💪✨";
      case "fertile":
        return "Fertile Window - Your creative energy is blooming! 🌸🦋";
      default:
        return "Beautiful Day - You're absolutely radiant! 🌟💖";
    }
  };

  const getPhaseEmoji = (day: Date) => {
    if (!userData?.lastPeriod) return "🌟";

    const status = getDayStatus(
      day,
      userData.lastPeriod,
      cycleLength,
      periodLength
    );

    switch (status) {
      case "onPeriod":
        return "🌹";
      case "fertile":
        return "🦋";
      default:
        return "✨";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 pb-20 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="h-6 w-6 text-pink-400" />
            ) : i % 3 === 1 ? (
              <Flower className="h-6 w-6 text-purple-400" />
            ) : (
              <Star className="h-6 w-6 text-yellow-400" />
            )}
          </div>
        ))}
      </div>

      {/* Animated Header */}
      <div className="bg-gradient-to-r from-empowher-primary via-empowher-secondary to-purple-600 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20"></div>
        <div className="container max-w-md mx-auto px-4 py-8 relative">
          <div
            className={`text-center transition-all duration-1000 ${
              showMagic
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <CalendarIcon className="h-10 w-10 mr-3 animate-pulse" />
                <Zap className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300 animate-bounce" />
              </div>
              <h1 className="text-3xl font-bold">Your Magical Calendar</h1>
              <Sparkles className="h-8 w-8 ml-3 animate-spin text-yellow-300" />
            </div>
            <p
              className="text-white/90 text-lg animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              {cycleQuote}
            </p>
          </div>
        </div>
      </div>

      <div
        className="container max-w-md mx-auto px-4 py-6 space-y-6"
        ref={calendarRef}
      >
        {/* Main Calendar Card */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50"></div>
          <CardHeader className="pb-4 bg-gradient-to-r from-empowher-light/60 to-purple-100/60 relative">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={prevMonth}
                className="p-3 hover:bg-white/70 rounded-full transition-all duration-300 hover:scale-125 hover:shadow-lg group"
              >
                <ChevronLeft className="h-6 w-6 group-hover:text-pink-600" />
              </Button>
              <div className="text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                  {format(currentMonth, "MMMM yyyy")}
                </h2>
                <div className="flex justify-center mt-1">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 text-yellow-400 mx-1 animate-pulse"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={nextMonth}
                className="p-3 hover:bg-white/70 rounded-full transition-all duration-300 hover:scale-125 hover:shadow-lg group"
              >
                <ChevronRight className="h-6 w-6 group-hover:text-purple-600" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 relative">
            {/* Day names header */}
            <div className="grid grid-cols-7 mb-6">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <div
                    key={day}
                    className="text-center text-sm font-bold text-empowher-text/80 py-3"
                  >
                    <div
                      className={`inline-block px-3 py-2 rounded-full transition-all duration-300 ${
                        index === 0 || index === 6
                          ? "bg-gradient-to-r from-pink-200 to-purple-200 text-empowher-primary shadow-sm"
                          : "hover:bg-empowher-light/50"
                      }`}
                    >
                      {day}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: getDay(startOfMonth(currentMonth)) }).map(
                (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                )
              )}

              {days.map((day) => (
                <button
                  key={day.toString()}
                  className={cn(
                    "aspect-square rounded-2xl flex flex-col items-center justify-center text-sm relative transition-all duration-300 font-medium pointer-events-auto",
                    isSameMonth(day, currentMonth)
                      ? "text-empowher-text"
                      : "text-empowher-text/30",
                    isSameDay(day, new Date()) &&
                      "ring-4 ring-yellow-400 ring-offset-2 ring-offset-white",
                    getDayClass(day),
                    hoveredDay &&
                      isSameDay(day, hoveredDay) &&
                      "shadow-2xl z-20"
                  )}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={() => handleDayClick(day)}
                  type="button"
                >
                  <div className="flex flex-col items-center relative">
                    <span className="font-bold text-lg">
                      {format(day, "d")}
                    </span>
                    <div className="mt-1">{getDayIcon(day)}</div>
                    {hoveredDay && isSameDay(day, hoveredDay) && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs animate-bounce">
                        {getPhaseEmoji(day)}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Day Info */}
        {selectedDay && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-empowher-light/40 animate-fade-in overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 to-purple-100/30"></div>
            <CardContent className="p-8 relative">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-4xl mr-3">
                    {getPhaseEmoji(selectedDay)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-empowher-text">
                      {format(selectedDay, "EEEE")}
                    </h3>
                    <p className="text-empowher-text/60 text-lg">
                      {format(selectedDay, "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="text-4xl ml-3 animate-pulse">
                    {getPhaseEmoji(selectedDay)}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mt-4">
                  <p className="text-empowher-text text-xl font-medium">
                    {getPhaseMessage(selectedDay)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedDay(null)}
                  className="mt-4 border-empowher-primary/50 text-empowher-primary hover:bg-empowher-light/50"
                >
                  Close Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Beautiful Legend */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50"></div>
          <CardContent className="p-6 relative">
            <h3 className="text-xl font-bold text-empowher-text mb-6 text-center flex items-center justify-center">
              <Crown className="h-6 w-6 mr-2 text-yellow-500" />
              Your Cycle Legend
              <Sparkles className="h-6 w-6 ml-2 text-purple-500 animate-pulse" />
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 mr-4 flex items-center justify-center shadow-lg">
                    <Droplets className="h-4 w-4 text-white animate-bounce" />
                  </div>
                  <span className="font-bold text-lg">Period Days</span>
                </div>
                <div className="text-2xl animate-pulse">🌹</div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-violet-100 hover:from-purple-200 hover:to-violet-200 transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 mr-4 flex items-center justify-center shadow-lg">
                    <Sparkles className="h-4 w-4 text-white animate-spin" />
                  </div>
                  <span className="font-bold text-lg">Fertile Window</span>
                </div>
                <div className="text-2xl animate-bounce">🦋</div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 mr-4 flex items-center justify-center shadow-lg ring-4 ring-yellow-400 ring-offset-2 ring-offset-white">
                    <Crown className="h-4 w-4 text-white animate-pulse" />
                  </div>
                  <span className="font-bold text-lg">Today</span>
                </div>
                <div className="text-2xl animate-pulse">✨</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function to get day of week, with 0 being Sunday
function getDay(date: Date) {
  // eslint-disable-next-line prefer-const
  let day = date.getDay();
  return day;
}

export default Calendar;
