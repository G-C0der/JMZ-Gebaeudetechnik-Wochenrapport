import React from 'react';
import { Login } from "./src/screens/Login.";
import { NativeBaseProvider } from "native-base";

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
}

export default App;
