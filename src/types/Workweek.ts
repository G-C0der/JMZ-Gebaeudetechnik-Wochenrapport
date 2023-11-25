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

interface WorkweekIdAlt {
  userId: User['id'];
  start: DateOnly;
  end: DateOnly;
}

type DateOnly = `${number}-${number}-${number}`;

export type {
  Workweek,
  WorkweekIdAlt,

  DateOnly
};
