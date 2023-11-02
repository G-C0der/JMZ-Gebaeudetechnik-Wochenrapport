import {makeAutoObservable, runInAction} from "mobx";
import { User, UserForm } from "../types";

class UserStore {
  user: User | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  register = async (form: UserForm) => {

  };
}

export {
  UserStore
};
