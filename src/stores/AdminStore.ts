import {makeAutoObservable, runInAction} from "mobx";
import { User } from "../types";
import { userApi } from "../services";
import { logErrorMessage } from "./utils";

export class AdminStore {
  users: User[] = [];

  isListUsersLoading = false;
  isChangeActiveStateLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  listUsers = async () => {
    this.isListUsersLoading = true;
    try {
      const { users } = await userApi.list();
      runInAction(() => {
        this.users = users;

        this.isListUsersLoading = false;
      });
    } catch (err) {
      logErrorMessage(err);

      if (this.isListUsersLoading) runInAction(() => this.isListUsersLoading = false);
    }
  };

  changeActiveState = async (id: number) => {
    this.isChangeActiveStateLoading = true;
    try {
      await userApi.changeActiveState(id);
      runInAction(() => {
        const updatedUserIndex = this.users.findIndex(user => user.id === id);
        const updatedUser = this.users[updatedUserIndex];
        if (updatedUserIndex !== 1) {
          this.users[updatedUserIndex] = { ...updatedUser, active: !updatedUser.active };
        }

        this.isChangeActiveStateLoading = false;
      });
    } catch (err) {
      logErrorMessage(err);

      if (this.isChangeActiveStateLoading) runInAction(() => this.isChangeActiveStateLoading = false);
    }
  };
}
