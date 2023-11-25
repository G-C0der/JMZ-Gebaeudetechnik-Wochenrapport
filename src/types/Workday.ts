import { StringNumberToNumber } from "./Common";
import { codeMap } from "../constants";
import { DateOnly } from "./Workweek";

interface Workday {
  date: DateOnly;
  from: string | null;
  to: string | null;
  from2: string | null;
  to2: string | null;
  project: string;
  code: Code;
}

interface WorkdayForm extends Omit<Workday, 'date'> {
  date: Date;
}

interface WorkdayFormInit extends Omit<WorkdayForm, 'code'> {
  code: Code | 0;
}

type Code = StringNumberToNumber<keyof typeof codeMap>;

export type {
  Workday,
  WorkdayForm,
  WorkdayFormInit
};
