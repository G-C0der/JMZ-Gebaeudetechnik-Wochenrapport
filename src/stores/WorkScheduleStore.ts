import { Store } from "./index";
import {makeAutoObservable, runInAction} from "mobx";
import { Workday, WorkdayForm, Workweek } from "../types";
import { workdayApi, workweekApi } from "../services";
import { logResponseErrorMessage } from "./utils";
import { getWeekDateRange, toDateOnly, toDateWithLocalMidnight } from "../utils";

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

  private belongsToCurrentWorkWeek = (workdayDate: Date) => {
    const { start, end } = getWeekDateRange(workdayDate);
    return this.currentWorkweek?.start === start && this.currentWorkweek.end === end;
  }

  getWorkdayFromCurrentWorkweek = (workdayDate: Date): Workday | undefined =>
    this.currentWorkweek?.workdays.find(workday => toDateWithLocalMidnight(workday.date).getTime() === workdayDate.getTime());

  private toWorkday = (form: WorkdayForm): Workday => ({ ...form, date: toDateOnly(form.date) });

  saveWorkday = async (form: WorkdayForm) => {
    this.isSaveWorkdayLoading = true;
    try {
      await workdayApi.save(form);

      runInAction(() => {
        if (this.currentWorkweek) {
          const currentWorkday = this.getWorkdayFromCurrentWorkweek(form.date);

          const workday = this.toWorkday(form);
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

  fetchWorkweek = async (workdayDate: Date) => {
    if (this.currentWorkweek && this.belongsToCurrentWorkWeek(workdayDate)) return;

    this.isFetchWorkweekLoading = true;
    try {
      const { workweek } = await workweekApi.fetch(workdayDate);

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
