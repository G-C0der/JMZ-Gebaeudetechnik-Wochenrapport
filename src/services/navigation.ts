import { createNavigationContainerRef } from "@react-navigation/native";
import { User } from "../types";

interface RootStackParamList {
  loginScreen: undefined;
  reportScreen?: { user: User };
  usersScreen: undefined;
  workStateScreen: { user: User };
}

type Screen = 'loginScreen' | 'reportScreen' | 'usersScreen' | 'workStateScreen';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (name: Screen, params?: any) => {
  if (navigationRef.isReady()) navigationRef.navigate(name, params);
};

export {
  navigationRef,
  navigate
};

export type {
  RootStackParamList
};
