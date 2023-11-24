import codes from '../data/codes.json';
import { StringNumberToNumber } from "./Common";

interface Workday {
  date: Date;
  from?: string;
  to?: string;
  from2?: string;
  to2?: string;
  project: string;
  code: Code;
}

interface WorkdayForm {
  date: Date;
  from: string | null;
  to: string | null;
  from2: string | null;
  to2: string | null;
  project: string;
  code: Code;
}

interface WorkdayFormInit {
  date: Date;
  from: string | null;
  to: string | null;
  from2: string | null;
  to2: string | null;
  project: string;
  code: Code | 0;
}

type Code = StringNumberToNumber<keyof typeof codes>;

export type {
  Workday,
  WorkdayForm,
  WorkdayFormInit
};
