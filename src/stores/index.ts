import { createContext, useContext } from "react";
import { UserStore } from "./UserStore";
import { AdminStore } from "./AdminStore";
import { emitter } from "../services";
import { WorkScheduleStore } from "./WorkScheduleStore";

interface Store {
  userStore: UserStore;
  adminStore: AdminStore;
  workScheduleStore: WorkScheduleStore;
}

// Init stores
const store: Store = {
  userStore: new UserStore(),
  adminStore: new AdminStore(),
  workScheduleStore: new WorkScheduleStore()
};

// Setup stores
(async () => {
  try {
    await store.userStore.setup();
  } catch (err) {
    console.error('Error during userStore setup:', err);
  }
})();

emitter.on('unauthorized', store.userStore.logout);

const StoreContext = createContext(store);

const useStore = () => useContext(StoreContext);

export {
  store,

  StoreContext,
  useStore
};
