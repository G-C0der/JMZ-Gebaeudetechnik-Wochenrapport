import { createContext, useContext } from "react";
import { UserStore } from "./UserStore";
import { AdminStore } from "./AdminStore";

const userStore = new UserStore();
(async () => await userStore.setup())();

const store = {
  userStore,
  adminStore: new AdminStore()
};

const StoreContext = createContext(store);

const useStore = useContext(StoreContext);

export {
  store,

  StoreContext,
  useStore
};
