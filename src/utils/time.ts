import moment from "moment";
import { DateOnly, WeekDateRange } from "../types";

const hasDatePassed = (timestamp: string | undefined) => {
  const expiry = JSON.parse(timestamp || '0');
  return Date.now() >= expiry;
};

/**
 * Explicitly format Date to DateOnly
 * Useful to avoid any potential pitfalls related to timezones or format mismatches
 * @param date
 */
const toDateOnly = (date?: Date): DateOnly => moment(date).format('YYYY-MM-DD') as DateOnly;

/**
 * Create a new Date object at midnight in the local time zone
 * This function should be used to convert DateOnly to Date instead of "new Date(dateOnly)", because
 * "new Date(dateOnly)" gets interpreted as a date in local timezone which results in different results in different
 * environments
 * @param dateOnly
 */
const toDateWithLocalMidnight = (dateOnly: DateOnly): Date => {
  const [year, month, day] = dateOnly.split('-').map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
};

/**
 * Get week date range from a specific date
 * @param date
 */
const getWeekDateRange = (date: Date): WeekDateRange => ({
  start: moment(date).startOf('week').format('YYYY-MM-DD') as DateOnly, // Start of the week (Monday)
  end: moment(date).endOf('week').format('YYYY-MM-DD') as DateOnly // End of the week (Sunday)
});

const timeStringToMinutes = (time: string | null) => {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export {
  hasDatePassed,
  toDateOnly,
  toDateWithLocalMidnight,
  getWeekDateRange,
  timeStringToMinutes
};
