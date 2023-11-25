import {makeAutoObservable, runInAction} from "mobx";
import { Workday, WorkdayForm, Workweek, WorkweekIdAlt } from "../types";
import { workdayApi, workweekApi } from "../services";
import { logErrorMessage } from "./utils";
import { toDateOnly } from "../utils";

export class WorkScheduleStore {
  currentWorkweek: Workweek | null = null; // Workweek of the currently selected workday

  isSaveWorkdayLoading = false;
  isFetchWorkweekLoading = false;
  isApproveWorkweekLoading = false;

  constructor() {
    makeAutoObservable(this);
  }
  // TODO: check with start and end date of workweek
  private belongsToCurrentWorkWeek = (workdayDate: Date) =>
    !!this.currentWorkweek?.workdays.find(workday => new Date(workday.date).getTime() === workdayDate.getTime());

  saveWorkday = async (form: WorkdayForm) => {
    this.isSaveWorkdayLoading = true;
    try {
      await workdayApi.save(form);

      runInAction(() => {
        if (this.currentWorkweek) {
          const currentWorkday = this.currentWorkweek.workdays.find(workday => new Date(workday.date) === form.date)

          const workday: Workday = { ...form, date: toDateOnly(form.date) };
          if (currentWorkday) Object.assign(currentWorkday, workday);
          else this.currentWorkweek.workdays.push(workday);
        }

        this.isSaveWorkdayLoading = false;
      });
    } catch (err) {
      logErrorMessage(err);

      if (this.isSaveWorkdayLoading) runInAction(() => this.isSaveWorkdayLoading = false);
    }
  };

  fetchWorkweek = async (workdayDate: Date) => {
    if (this.currentWorkweek && this.belongsToCurrentWorkWeek(workdayDate)) return;

    this.isFetchWorkweekLoading = true;
    try {
      const { workweek } = await workweekApi.fetch(workdayDate);
      console.log('workweek', workweek)
      runInAction(() => {
        this.currentWorkweek = workweek;

        this.isFetchWorkweekLoading = false;
      });
    } catch (err) {
      logErrorMessage(err);

      if (this.isFetchWorkweekLoading) runInAction(() => this.isFetchWorkweekLoading = false);
    }
  };

  approveWorkweek = async (workweekIdAlt: WorkweekIdAlt) => {
    this.isApproveWorkweekLoading = true;
    try {
      await workweekApi.approve(workweekIdAlt);
      runInAction(() => this.isApproveWorkweekLoading = false);
    } catch (err) {
      logErrorMessage(err);

      if (this.isApproveWorkweekLoading) runInAction(() => this.isApproveWorkweekLoading = false);
    }
  };
}
