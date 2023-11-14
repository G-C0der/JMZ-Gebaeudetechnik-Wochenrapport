import {hasDatePassed} from "../utils";

const isTokenExpired = (tokenExpiration: string | undefined) => hasDatePassed(tokenExpiration);

export {
  isTokenExpired
};
