import React from 'react';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from "./src/screens/Login";
import { Workday } from "./src/screens/Workday";
import Toast from "react-native-toast-message";
import { store, StoreContext } from "./src/stores";
import { navigationRef } from "./src/services";
import { toastConfig } from "./src/toastConfig";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer ref={navigationRef}>
        <StoreContext.Provider value={store}>
            <Stack.Navigator>
              {/*<Stack.Screen name='Login' component={Login} />*/}
              <Stack.Screen name='Arbeitstag' component={Workday} />
            </Stack.Navigator>
        </StoreContext.Provider>
      </NavigationContainer>

      <Toast config={toastConfig} />
    </GluestackUIProvider>
  );
}

export default App;
