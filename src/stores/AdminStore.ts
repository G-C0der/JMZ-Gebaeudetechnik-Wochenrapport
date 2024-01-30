import {makeAutoObservable, runInAction} from "mobx";
import { User, Workweek } from "../types";
import { userApi, workweekApi } from "../services";
import { logResponseErrorMessage } from "./utils";
import { store } from "./index";

export class AdminStore {
  users: User[] = [];
  userWorkweeks: Workweek[] = []; // Workweeks of the currently selected user

  isListUsersLoading = false;
  isListWorkweeksLoading = false;
  isApproveWorkweekLoading = false;
  isChangeUserActiveStateLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  private authorize = () => {
    if (!store.userStore.isAdmin) throw new Error('No permission.');
  };

  listUsers = async () => {
    this.authorize();

    this.isListUsersLoading = true;
    try {
      const { users } = await userApi.list();
      runInAction(() => {
        this.users = users.filter((user: User) => !user.admin);

        this.isListUsersLoading = false;
      });
    } catch (err) {
      logResponseErrorMessage(err);

      if (this.isListUsersLoading) runInAction(() => this.isListUsersLoading = false);
    }
  };

  listWorkweeks = async (userId: number) => {
    this.authorize();

    this.isListWorkweeksLoading = true;
    try {
      const { workweeks } = await workweekApi.list(userId);
      runInAction(() => this.userWorkweeks = workweeks);
    } catch (err) {
      logResponseErrorMessage(err);

      if (this.isListWorkweeksLoading) runInAction(() => this.isListWorkweeksLoading = false);
    }
  };

  approveWorkweeks = async (workweekIds: Workweek['id'][]) => {
    this.authorize();

    this.isApproveWorkweekLoading = true;
    try {
      await workweekApi.approve(workweekIds);
      runInAction(() => this.isApproveWorkweekLoading = false);
    } catch (err) {
      logResponseErrorMessage(err);

      if (this.isApproveWorkweekLoading) runInAction(() => this.isApproveWorkweekLoading = false);
    }
  };

  changeUserActiveState = async (id: number) => {
    this.authorize();

    this.isChangeUserActiveStateLoading = true;
    try {
      await userApi.changeActiveState(id);
      runInAction(() => {
        const updatedUserIndex = this.users.findIndex(user => user.id === id);
        const updatedUser = this.users[updatedUserIndex];
        if (updatedUserIndex !== 1) {
          this.users[updatedUserIndex] = { ...updatedUser, active: !updatedUser.active };
        }

        this.isChangeUserActiveStateLoading = false;
      });
    } catch (err) {
      logResponseErrorMessage(err);

      if (this.isChangeUserActiveStateLoading) runInAction(() => this.isChangeUserActiveStateLoading = false);
    }
  };
}
