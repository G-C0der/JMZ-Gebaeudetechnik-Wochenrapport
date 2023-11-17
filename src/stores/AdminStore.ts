import {makeAutoObservable, runInAction} from "mobx";
import { User } from "../types";
import { userApi } from "../services";
import { logErrorMessage } from "./utils";

export class AdminStore {
  users: User[] = [];

  listUsersLoading = false;
  changeActiveStateLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  listUsers = async () => {
    this.listUsersLoading = true;
    try {
      const users = await userApi.list();
      runInAction(() => {
        this.users = users;

        this.listUsersLoading = false;
      });
    } catch (err) {
      logErrorMessage(err);
    }
  };

  changeActiveState = async (id: number) => {
    this.changeActiveStateLoading = true;
    try {
      await userApi.changeActiveState(id);
      runInAction(() => {
        const updatedUserIndex = this.users.findIndex(user => user.id === id);
        const updatedUser = this.users[updatedUserIndex];
        if (updatedUserIndex !== 1) {
          this.users[updatedUserIndex] = { ...updatedUser, active: !updatedUser.active };
        }

        this.changeActiveStateLoading = false;
      });
    } catch (err) {
      logErrorMessage(err);
    }
  };
}
