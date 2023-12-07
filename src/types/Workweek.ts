import { Workday } from "./Workday";
import { User } from "./User";

interface Workweek {
  id: number;
  userId: User['id'];
  start: DateOnly;
  end: DateOnly;
  workdays: Workday[];
  approved: boolean;
}

type DateOnly = `${number}-${number}-${number}`;

type WeekDateRange = { start: DateOnly, end: DateOnly };

export type {
  Workweek,

  DateOnly,
  WeekDateRange
};
