import {makeAutoObservable, runInAction} from "mobx";
import { Workday, WorkdayForm, Workweek, WorkweekIdAlt } from "../types";
import { workdayApi, workweekApi } from "../services";
import { logResponseErrorMessage } from "./utils";
import { getWeekDateRange, toDateOnly } from "../utils";

export class WorkScheduleStore {
  currentWorkweek: Workweek | null = null; // Workweek of the currently selected workday

  isSaveWorkdayLoading = false;
  isFetchWorkweekLoading = false;
  isApproveWorkweekLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  private belongsToCurrentWorkWeek = (workdayDate: Date) => {
    const { start, end } = getWeekDateRange(workdayDate);
    return this.currentWorkweek?.start === start && this.currentWorkweek.end === end;
  }

  getWorkdayFromCurrentWorkweek = (workdayDate: Date): Workday | undefined =>
    this.currentWorkweek?.workdays.find(workday => new Date(workday.date).getTime() === workdayDate.getTime());

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

        this.isSaveWorkdayLoading = false;
      });
    } catch (err) {
      logResponseErrorMessage(err);

      if (this.isSaveWorkdayLoading) runInAction(() => this.isSaveWorkdayLoading = false);
    }
  };

  fetchWorkweek = async (workdayDate: Date) => {
    if (this.currentWorkweek && this.belongsToCurrentWorkWeek(workdayDate)) return;

    this.isFetchWorkweekLoading = true;
    try {
      const { workweek } = await workweekApi.fetch(workdayDate);

      runInAction(() => {
        this.currentWorkweek = workweek;

        this.isFetchWorkweekLoading = false;
      });
    } catch (err) {
      logResponseErrorMessage(err);

      if (this.isFetchWorkweekLoading) runInAction(() => this.isFetchWorkweekLoading = false);
    }
  };

  approveWorkweek = async (workweekIdAlt: WorkweekIdAlt) => {
    this.isApproveWorkweekLoading = true;
    try {
      await workweekApi.approve(workweekIdAlt);
      runInAction(() => this.isApproveWorkweekLoading = false);
    } catch (err) {
      logResponseErrorMessage(err);

      if (this.isApproveWorkweekLoading) runInAction(() => this.isApproveWorkweekLoading = false);
    }
  };
}
