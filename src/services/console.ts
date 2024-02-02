import { isDevEnv } from "../config/env";

// Hide not resolvable warnings from gluestack beta components for debugging purposes
if (isDevEnv) {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    const warningsToIgnore = [
      /If you do not provide children, you must specify an aria-label for accessibility/i,
      /<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop./i,
    ];
    if (warningsToIgnore.some(pattern => pattern.test(args[0]))) return;
    originalConsoleWarn.apply(console, args);
  };
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const errorsToIgnore = [
      /Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?/i,
    ];
    if (errorsToIgnore.some(pattern => pattern.test(args[0]))) return;
    originalConsoleError.apply(console, args);
  };
}
