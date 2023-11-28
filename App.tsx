import React from 'react';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import WorkdayScreen from "./src/screens/WorkdayScreen";
import Toast from "react-native-toast-message";
import { store, StoreContext, useStore } from "./src/stores";
import { navigationRef } from "./src/services";
import { toastConfig } from "./src/config/toast";
import './src/config/moment';
import Button from "./src/components/Button";

const Stack = createNativeStackNavigator();

export default function App() {
  const { userStore: { isLoggedIn: loggedIn } } = useStore();
  const isLoggedIn = loggedIn();
  console.log('LOGGED IN', isLoggedIn)
  const hamburger = (
    <Button
      icon='menu-fold'
      iconSize={23}
      contentColor='#000'
      bg='transparent'
      w='25%'
    />
  );

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer ref={navigationRef}>
        <StoreContext.Provider value={store}>
          <Stack.Navigator>
            {!isLoggedIn && <Stack.Screen name='Login' component={LoginScreen} />}
            {isLoggedIn && <Stack.Screen name='Arbeitstag' component={WorkdayScreen} options={{ headerRight: () => hamburger }} />}
          </Stack.Navigator>
        </StoreContext.Provider>
      </NavigationContainer>

      <Toast config={toastConfig} />
    </GluestackUIProvider>
  );
}
