import React from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, Droplets } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  daysUntilNextPeriod,
  getCurrentCycleDay,
} from "@/utils/periodCalculator";

const PeriodTracker: React.FC = () => {
  const { userData } = useUser();
  const navigate = useNavigate();

  // If we don't have a last period date, show the setup screen
  if (!userData?.lastPeriod) {
    return (
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Welcome to Period Tracking
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Let's get started by setting up your cycle information
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <p className="text-sm">Let's set up your period tracking!</p>
            <Button
              variant="outline"
              className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700 text-sm sm:text-base"
              onClick={() => navigate("/settings")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Go to Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Normal tracker display once we have the info
  if (userData?.lastPeriod) {
    const cycleLength = userData.cycleLength || 28;
    const daysUntil = daysUntilNextPeriod(userData.lastPeriod, cycleLength);
    const currentCycleDay = getCurrentCycleDay(
      userData.lastPeriod,
      cycleLength
    );
    const nextPeriodDate = addDays(new Date(), daysUntil);

    return (
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-empowher-primary to-empowher-secondary text-white p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold">
                Cycle Day {currentCycleDay}
              </h3>
              <p className="text-white/80 text-sm sm:text-base">
                of your {cycleLength}-day cycle
              </p>
            </div>
            <div className="bg-white/20 p-2 sm:p-3 rounded-full">
              <Droplets className="h-5 sm:h-6 w-5 sm:w-6" />
            </div>
          </div>
        </div>

        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
              <div>
                <p className="text-xs sm:text-sm text-empowher-text/70">
                  Next Period
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {format(nextPeriodDate, "MMM d, yyyy")}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs sm:text-sm text-empowher-text/70">
                  Days Until
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {daysUntil} days
                </p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-empowher-primary to-empowher-secondary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(currentCycleDay / cycleLength) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 border-t border-gray-100 p-3 sm:p-4 space-y-2">
          <Button
            variant="outline"
            className="w-full border-empowher-primary/50 text-empowher-primary hover:bg-empowher-light/50 hover:text-empowher-primary text-sm sm:text-base"
            onClick={() => navigate("/settings")}
          >
            Log Period Today
          </Button>
          <Button
            variant="outline"
            className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700 text-sm sm:text-base"
            onClick={() => navigate("/settings")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar Settings
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return null;
};

export default PeriodTracker;
