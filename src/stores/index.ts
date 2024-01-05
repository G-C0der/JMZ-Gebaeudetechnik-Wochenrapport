import { createContext, useContext } from "react";
import { UserStore } from "./UserStore";
import { AdminStore } from "./AdminStore";
import { emitter } from "../services";
import { WorkScheduleStore } from "./WorkScheduleStore";

interface Store {
  setup?: () => void;
  reset: () => void;
}

interface Stores {
  userStore: UserStore;
  adminStore: AdminStore;
  workScheduleStore: WorkScheduleStore;
}

// Init stores
const stores: Stores = {
  userStore: new UserStore(),
  adminStore: new AdminStore(),
  workScheduleStore: new WorkScheduleStore()
};

// Setup stores
(async () => {
  try {
    await stores.userStore.setup();
  } catch (err) {
    console.error('Error during userStore setup:', err);
  }
})();

setInterval(() => stores.userStore.handleTokenExpiration, 1000 * 60);

emitter.on('unauthorized', () => stores.userStore.logout());

const resetStores = () => Object.entries(stores).forEach(([_, store]) => store.reset());

const StoreContext = createContext(stores);

const useStore = () => useContext(StoreContext);

export {
  stores,
  resetStores,

  StoreContext,
  useStore
};

export type {
  Store
};
