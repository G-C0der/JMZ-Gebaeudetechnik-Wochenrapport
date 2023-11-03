import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Credentials, User, UserForm } from "../types";
import { authApi, storage, userApi } from "../services";
import { isTokenExpired } from "./utils";

export class UserStore {
  token: string | undefined;
  tokenExpiration: string | undefined;
  user: User | undefined;

  constructor() {
    makeAutoObservable(this);

    const tokenData = storage.retrieveToken();
    if (tokenData) {
      this.token = tokenData.token; // TODO: check how to do
      this.tokenExpiration = tokenData.tokenExpiration; // TODO: check how to do
    }

    // Token expiration handling
    reaction(
      () => this.tokenExpiration,
      (tokenExpiration) => {
        if (isTokenExpired(tokenExpiration)) this.logout(); // TODO: check how to do
      }
    );

    // User sync
    reaction(
      () => [this.token, this.user],
      ([token, user]) => {
        if (token && this.tokenExpiration && !user) {
          const syncAuthenticatedUser = () => {
            authApi.getAuthenticatedUser().then(({ user }) => {
              if (!user) return this.logout;
              runInAction(() => this.user = user);
            });
          }
        }
      }
    );

    // Storage update
    reaction(
      () => [this.token, this.tokenExpiration],
      ([token, tokenExpiration]) => {
        if (token && tokenExpiration) storage.storeToken(this.token!, this.tokenExpiration!);
        else // TODO: check how to do
      }
    );
  }

  login = async (credentials: Credentials) => {
    const { token, expiration, user } = await authApi.login(credentials);

    if (typeof token !== 'string' || !token.length || !expiration || !user) return;

    runInAction(() => {
      this.token = token;
      this.tokenExpiration = expiration;
      this.user = user;
    });
  };

  logout = async () => {
    // TODO: check how to do
  };

  register = async (form: UserForm) => await userApi.register(form);

  sendVerificationEmail = async (email: string) => await userApi.sendVerificationEmail(email);

  verify = async (token: string) => await userApi.verify(token);

  sendResetPasswordEmail = async (email: string) => await userApi.sendResetPasswordEmail(email);

  verifyResetPasswordToken = async (token: string) => await userApi.verifyResetPasswordToken(token);

  resetPassword = async (password: string, token: string) => await userApi.resetPassword(password, token);
}
