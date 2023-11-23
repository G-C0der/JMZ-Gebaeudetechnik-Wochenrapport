import { Workday } from "./Workday";
import { User } from "./User";

interface Workweek {
  id: number;
  userId: User['id'];
  start: Date;
  end: Date;
  workdays: Workday[];
  approved: boolean;
}

interface WorkweekIdAlt {
  userId: User['id'];
  start: Date;
  end: Date;
}

export type {
  Workweek,
  WorkweekIdAlt
};
