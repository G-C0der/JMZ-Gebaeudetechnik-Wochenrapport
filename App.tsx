import React from 'react';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from "./src/screens/Login";
import { Home } from "./src/screens/Home";
import Toast from "react-native-toast-message";
import { store, StoreContext } from "./src/stores";
import { navigationRef } from "./src/services";
import { toastConfig } from "./src/toastConfig";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <StoreContext.Provider value={store}>
            <Stack.Navigator>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Home' component={Home} />
            </Stack.Navigator>
        </StoreContext.Provider>
      </NavigationContainer>

      <Toast config={toastConfig} />
    </NativeBaseProvider>
  );
}

export default App;
