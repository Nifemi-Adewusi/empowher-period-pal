
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

// Calculate ovulation date - typically 12-16 days before next period (average 14)
// More accurate for varying cycle lengths
export const calculateOvulationDate = (lastPeriod: Date, cycleLength: number = 28): Date => {
  // For cycles shorter than 25 days, use 12-13 days before next period
  // For cycles 25-30 days, use 14 days before next period  
  // For cycles longer than 30 days, use 15-16 days before next period
  let daysBeforeNextPeriod = 14;
  
  if (cycleLength < 25) {
    daysBeforeNextPeriod = 12;
  } else if (cycleLength > 30) {
    daysBeforeNextPeriod = 16;
  }
  
  const nextPeriod = calculateNextPeriod(lastPeriod, cycleLength);
  return subDays(nextPeriod, daysBeforeNextPeriod);
};

// Calculate fertile window - 6 days total (5 days before ovulation + ovulation day)
// Based on medical research: sperm can survive up to 5 days, egg survives 12-24 hours
export const calculateFertileWindow = (lastPeriod: Date, cycleLength: number = 28): { start: Date; end: Date } => {
  const ovulation = calculateOvulationDate(lastPeriod, cycleLength);
  return {
    start: subDays(ovulation, 5), // 5 days before ovulation
    end: ovulation // ovulation day
  };
};

// Calculate the status of a specific day with improved accuracy
export const getDayStatus = (
  day: Date,
  lastPeriod: Date, 
  cycleLength: number = 28,
  periodLength: number = 5
): PeriodStatus => {
  const today = new Date();
  const dayTime = day.getTime();
  
  // Calculate multiple cycles to find which one the day falls into
  let currentPeriodStart = new Date(lastPeriod);
  
  // Go back a few cycles to catch earlier dates
  for (let i = 0; i < 6; i++) {
    currentPeriodStart = subDays(currentPeriodStart, cycleLength);
  }
  
  // Check up to 12 cycles forward
  for (let i = 0; i < 12; i++) {
    const periodEnd = calculatePeriodEnd(currentPeriodStart, periodLength);
    
    // Check if the day is within a period
    if (isWithinInterval(day, { start: currentPeriodStart, end: periodEnd })) {
      return 'onPeriod';
    }
    
    // Check if the day is within fertile window
    const fertileWindow = calculateFertileWindow(currentPeriodStart, cycleLength);
    if (isWithinInterval(day, { start: fertileWindow.start, end: fertileWindow.end })) {
      return 'fertile';
    }
    
    // Move to the next cycle
    currentPeriodStart = addDays(currentPeriodStart, cycleLength);
  }
  
  return 'regular';
};

// More accurate calculation of days until next period
export const daysUntilNextPeriod = (lastPeriod: Date, cycleLength: number = 28): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time for accurate day calculation
  
  let nextPeriod = calculateNextPeriod(lastPeriod, cycleLength);
  
  // If the calculated next period is in the past, find the upcoming one
  while (isBefore(nextPeriod, today)) {
    nextPeriod = addDays(nextPeriod, cycleLength);
  }
  
  const days = differenceInDays(nextPeriod, today);
  return Math.max(0, days); // Ensure we don't return negative days
};

// Calculate current cycle day (1-based counting)
export const getCurrentCycleDay = (lastPeriod: Date, cycleLength: number = 28): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let currentPeriodStart = new Date(lastPeriod);
  
  // Find which cycle we're currently in
  while (addDays(currentPeriodStart, cycleLength) <= today) {
    currentPeriodStart = addDays(currentPeriodStart, cycleLength);
  }
  
  const daysDiff = differenceInDays(today, currentPeriodStart);
  return Math.max(1, daysDiff + 1); // 1-based counting, minimum day 1
};

// Calculate a history of periods for the last 6 months with improved accuracy
export const generatePeriodHistory = (
  lastPeriod: Date, 
  cycleLength: number = 28, 
  periodLength: number = 5,
  count: number = 6
): { start: Date; end: Date; }[] => {
  const history = [];
  let currentStart = new Date(lastPeriod);
  
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

// Get next ovulation date for tracking
export const getNextOvulation = (lastPeriod: Date, cycleLength: number = 28): Date => {
  const today = new Date();
  let currentPeriodStart = new Date(lastPeriod);
  
  // Find current or next cycle
  while (addDays(currentPeriodStart, cycleLength) <= today) {
    currentPeriodStart = addDays(currentPeriodStart, cycleLength);
  }
  
  return calculateOvulationDate(currentPeriodStart, cycleLength);
};
