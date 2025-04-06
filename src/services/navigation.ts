import { createNavigationContainerRef } from "@react-navigation/native";
import { DateOnly, User } from "../types";

interface RootStackParamList {
  loginScreen: undefined;
  reportScreen: undefined;
  usersScreen: undefined;
  workStateScreen: { user: User; };
  adminReportScreen: { user: User; workweekStart: DateOnly; };
}

type Screen = 'loginScreen' | 'reportScreen' | 'usersScreen' | 'workStateScreen' | 'adminReportScreen';

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
