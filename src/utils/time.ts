import moment from "moment";
import { DateOnly, WeekDateRange } from "../types";

const hasDatePassed = (timestamp: string | undefined) => {
  const expiry = JSON.parse(timestamp || '0');
  return Date.now() >= expiry;
};

/**
 * Explicitly format date to dateonly
 * Useful to avoid any potential pitfalls related to timezones or format mismatches
 * @param date
 */
const toDateOnly = (date?: Date): DateOnly => moment(date).format('YYYY-MM-DD') as DateOnly;

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
  getWeekDateRange,
  timeStringToMinutes
};
