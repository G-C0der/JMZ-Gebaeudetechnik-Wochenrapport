import Config from "react-native-config";

const env = Config.ENV || 'development';
const isDevEnv = env === 'development';
const isProdEnv = env === 'production';

const serverAPIBaseURL = Config.SERVER_API_BASE_URL || 'http://10.0.2.2:4000/api/v1';

const appColorTheme = Config.APP_COLOR_THEME || '#c8ce73';

export {
  env,
  isDevEnv,
  isProdEnv,

  serverAPIBaseURL,

  appColorTheme
};
