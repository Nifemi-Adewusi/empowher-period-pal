
import { format, addDays, subDays, isSameDay, getDay, startOfWeek, addWeeks } from 'date-fns';

// Format date as YYYY-MM-DD
export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// Format date as Month D, YYYY
export const formatReadableDate = (date: Date): string => {
  return format(date, 'MMMM d, yyyy');
};

// Get array of dates for a week starting from a specific date
export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
};

// Get array of dates for next 4 weeks
export const getMonthView = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 28 }).map((_, i) => addDays(start, i));
};

// Get day of week as a string
export const getDayName = (date: Date): string => {
  return format(date, 'EEE');
};

// Check if a date is today
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};
