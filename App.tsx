import React from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import WorkdayScreen from "./src/screens/WorkdayScreen";
import Toast from "react-native-toast-message";
import { store, StoreContext } from "./src/stores";
import { navigate, navigationRef } from "./src/services";
import { toastConfig } from "./src/config/toast";
import './src/config/moment';
import Menu from "./src/components/Menu";
import UsersScreen from "./src/screens/UsersScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const menu = <Menu options={[
    { icon: 'calendar', text: 'Rapport', onPress: () => navigate('Rapport') },
    { icon: 'addusergroup', text: 'Mitarbeiter', onPress: () => navigate('Mitarbeiter') }
  ]} />

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer ref={navigationRef}>
        <StoreContext.Provider value={store}>
            <Stack.Navigator>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Rapport' component={WorkdayScreen} options={{ headerRight: () => menu }} />
              <Stack.Screen name='Mitarbeiter' component={UsersScreen} options={{ headerRight: () => menu }} />
            </Stack.Navigator>
        </StoreContext.Provider>
      </NavigationContainer>

      <Toast config={toastConfig} />
    </GluestackUIProvider>
  );
}
