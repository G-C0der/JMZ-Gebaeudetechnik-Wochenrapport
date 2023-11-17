import {hasDatePassed} from "../utils";

const isTokenExpired = (tokenExpiration: string | undefined) => hasDatePassed(tokenExpiration);

const logErrorMessage = (err: any) => console[err.response?.data?.severity === 'warning' ? 'warn' : 'error'](
  err.response?.data?.message ?? err
);

export {
  isTokenExpired,
  logErrorMessage
};
