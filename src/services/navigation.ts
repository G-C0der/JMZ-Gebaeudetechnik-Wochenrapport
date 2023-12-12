import { createNavigationContainerRef, NavigationProp } from "@react-navigation/native";
import { User } from "../types";

interface RootStackParamList {
  Login: undefined;
  Rapport: undefined;
  Mitarbeiter: undefined;
  Arbeitszeit: { user: User };
}

type Screen = 'Login' | 'Rapport' | 'Mitarbeiter' | 'Arbeitszeit';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (name: Screen, params?: any) => {
  if (navigationRef.isReady()) navigationRef.navigate(name, params);
};

export {
  navigationRef,
  navigate
};
