
import { addDays, subDays, differenceInDays, isBefore, isSameDay, isWithinInterval } from 'date-fns';

export type PeriodData = {
  lastPeriodStart: Date;
  cycleLength: number;
  periodLength: number;
};

type PeriodStatus = 'onPeriod' | 'fertile' | 'regular';

// Calculate the next expected period date based on last period and cycle length
export const calculateNextPeriod = (lastPeriod: Date, cycleLength: number = 28): Date => {
  return addDays(lastPeriod, cycleLength);
};

// Calculate the period end date based on start date and period length
export const calculatePeriodEnd = (periodStart: Date, periodLength: number = 5): Date => {
  return addDays(periodStart, periodLength - 1);
};

// Calculate fertile window (typically 5 days before ovulation plus ovulation day)
export const calculateFertileWindow = (lastPeriod: Date, cycleLength: number = 28): { start: Date; end: Date } => {
  // Ovulation typically occurs 14 days before the next period starts
  const ovulation = addDays(lastPeriod, cycleLength - 14);
  return {
    start: subDays(ovulation, 5),
    end: ovulation
  };
};

// Calculate the status of a specific day
export const getDayStatus = (
  day: Date,
  lastPeriod: Date, 
  cycleLength: number = 28,
  periodLength: number = 5
): PeriodStatus => {
  // Calculate all periods in a range to check
  let currentPeriodStart = lastPeriod;
  
  // Check for next 3 cycles
  for (let i = 0; i < 3; i++) {
    const periodEnd = calculatePeriodEnd(currentPeriodStart, periodLength);
    
    // Check if the day is within a period
    if (isWithinInterval(day, { start: currentPeriodStart, end: periodEnd })) {
      return 'onPeriod';
    }
    
    // Move to the next cycle
    const fertileWindow = calculateFertileWindow(currentPeriodStart, cycleLength);
    if (isWithinInterval(day, { start: fertileWindow.start, end: fertileWindow.end })) {
      return 'fertile';
    }
    
    currentPeriodStart = addDays(currentPeriodStart, cycleLength);
  }
  
  return 'regular';
};

// Days until next period
export const daysUntilNextPeriod = (lastPeriod: Date, cycleLength: number = 28): number => {
  const today = new Date();
  let nextPeriod = calculateNextPeriod(lastPeriod, cycleLength);
  
  // Find the upcoming period if we've already passed the calculated next period
  while (isBefore(nextPeriod, today) && !isSameDay(nextPeriod, today)) {
    nextPeriod = calculateNextPeriod(nextPeriod, cycleLength);
  }
  
  return differenceInDays(nextPeriod, today);
};

// Calculate a history of periods for the last 6 months
export const generatePeriodHistory = (
  lastPeriod: Date, 
  cycleLength: number = 28, 
  periodLength: number = 5,
  count: number = 6
): { start: Date; end: Date; }[] => {
  const history = [];
  let currentStart = lastPeriod;
  
  // Add the most recent period
  history.push({
    start: currentStart,
    end: calculatePeriodEnd(currentStart, periodLength)
  });
  
  // Add previous periods
  for (let i = 1; i < count; i++) {
    currentStart = subDays(currentStart, cycleLength);
    history.push({
      start: currentStart,
      end: calculatePeriodEnd(currentStart, periodLength)
    });
  }
  
  // Sort from oldest to newest
  return history.reverse();
};
