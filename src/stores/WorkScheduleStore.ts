import {makeAutoObservable, runInAction} from "mobx";
import { Workday, Workweek, WorkweekIdAlt } from "../types";
import { workdayApi, workweekApi } from "../services";
import { logErrorMessage } from "./utils";

export class WorkScheduleStore {
  currentWorkweek: Workweek | undefined; // Workweek of the currently selected workday

  isSaveWorkdayLoading = false;
  isFetchWorkweekLoading = false;
  isApproveWorkweekLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  saveWorkday = async (form: Workday) => {
    this.isSaveWorkdayLoading = true;
    try {
      await workdayApi.save(form);
      runInAction(() => this.isSaveWorkdayLoading = false);
    } catch (err) {
      logErrorMessage(err);

      if (this.isSaveWorkdayLoading) runInAction(() => this.isSaveWorkdayLoading = false);
    }
  };

  fetchWorkweek = async (workdayDate: Date) => {
    this.isFetchWorkweekLoading = true;
    try {
      const { workweek } = await workweekApi.fetch(workdayDate);
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
