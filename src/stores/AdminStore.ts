import { Store, stores } from "./index";
import {makeAutoObservable, runInAction} from "mobx";
import { User, Workweek } from "../types";
import { userApi, workweekApi } from "../services";
import { logResponseErrorMessage } from "./utils";

const initialState = {
  users: [],
  userWorkweeks: [],

  isListUsersLoading: false,
  isListWorkweeksLoading: false,
  isApproveWorkweekLoading: false,
  isChangeUserActiveStateLoading: false
};

export class AdminStore implements Store {
  users: User[] = initialState.users;
  userWorkweeks: Workweek[] = initialState.userWorkweeks; // Workweeks of the currently selected user

  isListUsersLoading = initialState.isListUsersLoading;
  isListWorkweeksLoading = initialState.isListWorkweeksLoading;
  isApproveWorkweekLoading = initialState.isApproveWorkweekLoading;
  isChangeUserActiveStateLoading = initialState.isChangeUserActiveStateLoading;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => Object.assign(this, initialState);

  private authorize = () => {
    if (!stores.userStore.isAdmin) throw new Error('No permission.');
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
