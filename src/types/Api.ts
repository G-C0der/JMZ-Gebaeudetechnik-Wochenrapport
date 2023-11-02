import {User} from ".";

interface ApiResponse<T = never> {
  readonly severity?: ApiResponseSeverity;
  readonly message?: string;
  readonly data?: T;
}

type ApiResponseSeverity = 'success' | 'error' | 'warning';

interface ApiDataEmailSent {
  wasEmailSent: boolean;
}

interface ApiDataUserList {
  users: User[];
}

export type {
  ApiResponse,
  ApiResponseSeverity,

  ApiDataEmailSent,
  ApiDataUserList
};
