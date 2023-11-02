import { ApiResponse, ApiResponseSeverity } from "../types";
import {hasDatePassed} from "../utils";

const isTokenExpired = (tokenExpiration: string | null) => hasDatePassed(tokenExpiration);

const toApiResponse = <T = never>(severity?: ApiResponseSeverity, message?: string, data?: T): ApiResponse<T> => ({
  severity,
  message,
  data
});

export {
  isTokenExpired,
  toApiResponse
};
