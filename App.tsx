import React from "react";
import { GluestackUIProvider, Spinner } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screen/LoginScreen";
import ReportScreen from "./src/screen/ReportScreen";
import Toast from "react-native-toast-message";
import { stores, StoreContext, useStore } from "./src/stores";
import { navigationRef } from "./src/services";
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
          <StoreContext.Provider value={stores}>
            <Stack.Navigator>
              {!isLoggedIn && <Stack.Screen name='loginScreen' component={LoginScreen} options={{ title: 'Login' }} />}
              {isLoggedIn && (
                <>
                  <Stack.Screen name='reportScreen' component={ReportScreen} options={{
                    header: () => <ScreenHeader title='Rapport' />
                  }} />
                  <Stack.Screen name='usersScreen' component={UsersScreen} options={{
                    header: () => <ScreenHeader title='Mitarbeiter' />
                  }} />
                  <Stack.Screen name='workStateScreen' component={UserWorkStateScreen} options={{
                    header: () => <ScreenHeader title='Arbeitszeit' />
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
