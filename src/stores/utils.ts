import {hasDatePassed} from "../utils";

const isTokenExpired = (tokenExpiration: string | null) => hasDatePassed(tokenExpiration);

export {
  isTokenExpired
};
