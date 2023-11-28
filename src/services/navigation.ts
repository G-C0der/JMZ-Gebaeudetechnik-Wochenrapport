import { createNavigationContainerRef, NavigationProp } from "@react-navigation/native";

interface RootStackParamList {
  Login: undefined;
  Arbeitstag: undefined;
}

type Screen = 'Login' | 'Arbeitstag';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (name: Screen, params?: any) => {
  if (navigationRef.isReady()) navigationRef.navigate(name, params);
};

export {
  navigationRef,
  navigate
};
