import React from "react";
import { GluestackUIProvider, Spinner, Text } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screen/LoginScreen";
import WorkdayScreen from "./src/screen/WorkdayScreen";
import Toast from "react-native-toast-message";
import { store, StoreContext, useStore } from "./src/stores";
import { navigate, navigationRef } from "./src/services";
import { toastConfig } from "./src/config/toast";
import './src/config/moment';
import UsersScreen from "./src/screen/UsersScreen";
import UserWorkStateScreen from "./src/screen/UserWorkStateScreen";
import { observer } from "mobx-react-lite";
import ScreenHeader from "./src/screen/ScreenHeader";

const Stack = createNativeStackNavigator();

export default observer(function App() {
  const { userStore: { isSetupDone, isLoggedIn } } = useStore();

  return (
    <GluestackUIProvider config={config}>
      {!isSetupDone ? (
        <Spinner size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      ) : (
        <NavigationContainer ref={navigationRef}>
          <StoreContext.Provider value={store}>
            <Stack.Navigator>
              {!isLoggedIn && <Stack.Screen name='Login' component={LoginScreen} />}
              {isLoggedIn && (
                <>
                  <Stack.Screen name='Rapport' component={WorkdayScreen} options={{
                    header: () => <ScreenHeader />
                  }} />
                  <Stack.Screen name='Mitarbeiter' component={UsersScreen} options={{
                    header: () => <ScreenHeader />
                  }} />
                  <Stack.Screen name='Arbeitszeit' component={UserWorkStateScreen} options={{
                    header: () => <ScreenHeader />
                  }} />
                </>
              )}
            </Stack.Navigator>
          </StoreContext.Provider>
        </NavigationContainer>
      )}

      <Toast config={toastConfig} />
    </GluestackUIProvider>
  );
});
