import { Store } from "./index";
import {makeAutoObservable, runInAction} from "mobx";
import { User, Workday, WorkdayForm, WorkdayFormMapped, WorkdayProject, Workweek } from "../types";
import { workdayApi, workweekApi } from "../services";
import { logResponseErrorMessage } from "./utils";
import { getWeekDateRange, toDateOnly, toDateWithLocalMidnight } from "../utils";
import moment from "moment";

const initialState = {
  currentWorkweek: null,

  isSaveWorkdayLoading: false,
  isFetchWorkweekLoading: false
};

export class WorkScheduleStore implements Store {
  currentWorkweek: Workweek | null = initialState.currentWorkweek; // Workweek of the currently selected workday

  isSaveWorkdayLoading = initialState.isSaveWorkdayLoading;
  isFetchWorkweekLoading = initialState.isFetchWorkweekLoading;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    Object.assign(this, initialState);
  };

  resetCurrentWorkweek() {
    runInAction(() => this.currentWorkweek = initialState.currentWorkweek);
  }

  private belongsToCurrentWorkWeek = (workdayDate: Date) => {
    const { start, end } = getWeekDateRange(workdayDate);
    return this.currentWorkweek?.start === start && this.currentWorkweek.end === end;
  }

  getWorkdayFromCurrentWorkweek = (workdayDate: Date): { workday: WorkdayForm; projectsCount: number; } | undefined => {
    const workday = this.currentWorkweek?.workdays.find(workday => toDateWithLocalMidnight(workday.date).getTime() === workdayDate.getTime());
    return workday ? this.toWorkdayForm(workday) : undefined;
  };

  private toWorkdayForm = (workday: Workday): { workday: WorkdayForm; projectsCount: number; } => {
    const data: { workday: WorkdayForm; projectsCount: number; } = { workday: {
      date: moment(workday.date).toDate() },
      projectsCount: workday.projects.length
    };

    workday.projects.forEach((p, i) => {
      data['workday'][`from-${i}`] = p.from ?? null;
      data['workday'][`to-${i}`] = p.to ?? null;
      data['workday'][`from2-${i}`] = p.from2 ?? null;
      data['workday'][`to2-${i}`] = p.to2 ?? null;
      data['workday'][`project-${i}`] = p.project;
      data['workday'][`code-${i}`] = p.code;
    });

    return data;
  };

  private toWorkdayFormMapped = (form: WorkdayForm): WorkdayFormMapped => {
    const { date, ...rest } = form;
    const projects: WorkdayProject[] = [];

    const projectIndexes = Object.keys(rest)
      .filter(k => k.startsWith('project-'))
      .map(k => Number(k.split('-')[1]))
      .filter(i => !isNaN(i))
      .sort((a, b) => a - b);

    for (const i of projectIndexes) {
      const project = rest[`project-${i}`];
      const code = rest[`code-${i}`];

      if (!project || !code) break;

      projects.push({
        from: rest[`from-${i}`] ?? null,
        to: rest[`to-${i}`] ?? null,
        from2: rest[`from2-${i}`] ?? null,
        to2: rest[`to2-${i}`] ?? null,
        project,
        code,
      });
    }

    return { date, projects };
  };

  private toWorkday = (form: WorkdayFormMapped): Workday => ({ ...form, date: toDateOnly(form.date) });

  saveWorkday = async (form: WorkdayForm) => {
    this.isSaveWorkdayLoading = true;
    try {
      const formMapped = this.toWorkdayFormMapped(form);
      await workdayApi.save(formMapped);

      runInAction(() => {
        if (this.currentWorkweek) {
          const currentWorkday = this.getWorkdayFromCurrentWorkweek(form.date);

          const workday = this.toWorkday(formMapped);
          if (currentWorkday) Object.assign(currentWorkday, workday);
          else this.currentWorkweek.workdays.push(workday);
        }

        this.isSaveWorkdayLoading = initialState.isSaveWorkdayLoading;
      });
    } catch (err) {
      logResponseErrorMessage(err);

      runInAction(() => this.isSaveWorkdayLoading = initialState.isSaveWorkdayLoading);
    }
  };

  fetchWorkweek = async (workdayDate: Date, viewUserId?: User['id']) => {
    if (this.currentWorkweek && this.belongsToCurrentWorkWeek(workdayDate)) return;

    this.isFetchWorkweekLoading = true;
    try {
      const { workweek } = await workweekApi.fetch(workdayDate, viewUserId);

      runInAction(() => {
        this.currentWorkweek = workweek;
        this.isFetchWorkweekLoading = initialState.isFetchWorkweekLoading;
      });
    } catch (err) {
      logResponseErrorMessage(err);

      runInAction(() => {
        this.currentWorkweek = initialState.currentWorkweek;
        this.isFetchWorkweekLoading = initialState.isFetchWorkweekLoading;
      });
    }
  };
}
