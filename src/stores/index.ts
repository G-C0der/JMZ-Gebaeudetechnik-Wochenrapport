import { UserStore } from "./UserStore";
import { AdminStore } from "./AdminStore";

const userStore = new UserStore();
(async () => await userStore.setup())();

const store = {
  userStore,
  adminStore: new AdminStore()
};

export {
  store
};
