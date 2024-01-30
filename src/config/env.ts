import Config from "react-native-config";

const serverAPIBaseURL = Config.SERVER_API_BASE_URL || 'http://10.0.2.2:4000/api/v1';

const appColorTheme = Config.APP_COLOR_THEME || '#c8ce73';

export {
  serverAPIBaseURL,

  appColorTheme
};
