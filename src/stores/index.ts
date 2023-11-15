import { createContext, useContext } from "react";
import { UserStore } from "./UserStore";
import { AdminStore } from "./AdminStore";
import { emitter } from "../services";

// Init stores
const store = {
  userStore: new UserStore(),
  adminStore: new AdminStore()
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

const useStore = useContext(StoreContext);

export {
  store,

  StoreContext,
  useStore
};
