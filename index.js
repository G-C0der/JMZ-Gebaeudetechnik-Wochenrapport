/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { isDevEnv } from "./src/config/env";

// Hide not resolvable warnings from gluestack beta components for debugging purposes
if (isDevEnv) {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    const warningsToIgnore = [
      /If you do not provide children, you must specify an aria-label for accessibility/i,
      /<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop./i,
    ];
    if (warningsToIgnore.some(pattern => pattern.test(args[0]))) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

AppRegistry.registerComponent(appName, () => App);
