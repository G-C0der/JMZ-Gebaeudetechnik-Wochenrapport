import { createNavigationContainerRef, NavigationProp } from "@react-navigation/native";
import { User } from "../types";

interface RootStackParamList {
  loginScreen: undefined;
  reportScreen: undefined;
  employeesScreen: undefined;
  workStateScreen: { user: User };
}

type Screen = 'loginScreen' | 'reportScreen' | 'employeesScreen' | 'workStateScreen';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (name: Screen, params?: any) => {
  if (navigationRef.isReady()) navigationRef.navigate(name, params);
};

export {
  navigationRef,
  navigate
};
