import { StringNumberToNumber } from "./Common";
import { codeMap } from "../constants";

interface Workday {
  date: Date;
  from?: string;
  to?: string;
  from2?: string;
  to2?: string;
  project: string;
  code: Code;
}

interface WorkdayForm extends Omit<Workday, 'from' | 'to' | 'from2' | 'to2'> {
  from: string | null;
  to: string | null;
  from2: string | null;
  to2: string | null;
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
