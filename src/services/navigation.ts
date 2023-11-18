import { createNavigationContainerRef, NavigationProp } from "@react-navigation/native";

interface RootStackParamList {
  Login: undefined;
  Rapport: undefined;
}

type Screen = 'Login' | 'Rapport';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (name: Screen, params?: any) => {
  if (navigationRef.isReady()) navigationRef.navigate(name, params);
};

export {
  navigationRef,
  navigate
};
