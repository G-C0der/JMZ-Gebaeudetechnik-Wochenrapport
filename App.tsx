import React from "react";
import { GluestackUIProvider, Spinner } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import WorkdayScreen from "./src/screens/WorkdayScreen";
import Toast from "react-native-toast-message";
import { store, StoreContext, useStore } from "./src/stores";
import { navigate, navigationRef } from "./src/services";
import { toastConfig } from "./src/config/toast";
import './src/config/moment';
import Menu from "./src/components/Menu";
import UsersScreen from "./src/screens/UsersScreen";
import UserWorkStateScreen from "./src/screens/UserWorkStateScreen";
import { observer } from "mobx-react-lite";

const Stack = createNativeStackNavigator();

export default observer(function App() {
  const { userStore: { logout, isSetupDone, isLoggedIn } } = useStore();
  console.log('LOGGED IN', isLoggedIn)

  const menu = <Menu options={[
    { icon: 'calendar', text: 'Rapport', onPress: () => navigate('Rapport') },
    { icon: 'addusergroup', text: 'Mitarbeiter', onPress: () => navigate('Mitarbeiter') },
    { icon: 'logout', text: 'Ausloggen', onPress: logout }
  ]} />

  return !isSetupDone ? (
      <Spinner size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    ) : (
    <GluestackUIProvider config={config}>
      <NavigationContainer ref={navigationRef}>
        <StoreContext.Provider value={store}>
          <Stack.Navigator>
            {!isLoggedIn && <Stack.Screen name='Login' component={LoginScreen} />}
            {isLoggedIn && <Stack.Screen name='Rapport' component={WorkdayScreen} options={{ headerRight: () => menu }} />}
            <Stack.Screen name='Mitarbeiter' component={UsersScreen} options={{ headerRight: () => menu }} />
            <Stack.Screen name='Arbeitszeit' component={UserWorkStateScreen} options={{ headerRight: () => menu }} />
          </Stack.Navigator>
        </StoreContext.Provider>
      </NavigationContainer>

      <Toast config={toastConfig} />
    </GluestackUIProvider>
  );
});
