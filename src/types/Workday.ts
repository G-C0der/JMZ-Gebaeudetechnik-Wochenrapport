import { NumericStringToNumber } from "./Common";
import { codeMap } from "../constants";
import { DateOnly } from "./Workweek";

interface WorkdayProject {
  from: string | null;
  to: string | null;
  from2: string | null;
  to2: string | null;
  project: string;
  code: Code;
};

interface Workday {
  date: DateOnly;
  projects: WorkdayProject[];
}

interface WorkdayForm {
  date: Date;
  [key: `from-${number}`]: string | null;
  [key: `to-${number}`]: string | null;
  [key: `from2-${number}`]: string | null;
  [key: `to2-${number}`]: string | null;
  [key: `project-${number}`]: string;
  [key: `code-${number}`]: Code | 0;
}

interface WorkdayFormMapped extends Pick<WorkdayForm, 'date'>, Pick<Workday, 'projects'> {}

type Code = NumericStringToNumber<keyof typeof codeMap>;

export type {
  WorkdayProject,
  Workday,
  WorkdayForm,
  WorkdayFormMapped
};
