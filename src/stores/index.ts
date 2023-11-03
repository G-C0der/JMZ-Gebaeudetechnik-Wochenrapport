import { UserStore } from "./UserStore";
import { AdminStore } from "./AdminStore";

const store = {
  userStore: new UserStore(),
  adminStore: new AdminStore()
};

export {
  store
};
