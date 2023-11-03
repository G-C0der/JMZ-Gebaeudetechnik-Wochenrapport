import {makeAutoObservable, runInAction} from "mobx";
import { User } from "../types";
import { userApi } from "../services";

export class AdminStore {
  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  listUsers = async () => {
    const users = await userApi.list();
    runInAction(() => this.users = users);
  };

  changeActiveState = async (id: number) => {
    await userApi.changeActiveState(id);
    runInAction(() => {
      const updatedUserIndex = this.users.findIndex(user => user.id === id);
      const updatedUser = this.users[updatedUserIndex];
      if (updatedUserIndex !== 1) {
        this.users[updatedUserIndex] = { ...updatedUser, active: !updatedUser.active };
      }
    });
  };
}
