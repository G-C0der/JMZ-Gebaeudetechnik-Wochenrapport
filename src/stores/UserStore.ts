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

    // Storage update
    reaction(
      () => [this.token, this.tokenExpiration],
      ([token, tokenExpiration]) => {
        if (token && tokenExpiration) storage.storeToken(this.token!, this.tokenExpiration!); // TODO: wouldn't it be better if i in this condition also would check that token and tokenExpiration from state matches token and tokenExpiration from storage?
        else storage.deleteToken(); // TODO: will be sufficient when called synchronously? will logout be called here indirectly? if not, why not calling logout instead?
      }
    );

    // Token expiration handling
    reaction(
      () => this.tokenExpiration,
      (tokenExpiration) => {
        if (isTokenExpired(tokenExpiration)) this.logout(); // TODO: will be sufficient when called synchronously?
      }
    );

    // User sync
    reaction(
      () => [this.token, this.user],
      ([token, user]) => {
        if (token && this.tokenExpiration && !user) {
          authApi.getAuthenticatedUser().then(({ user }) => {
            if (!user) this.logout; // TODO: will be sufficient when called synchronously?
            else runInAction(() => this.user = user);
          });
        }
      }
    );
  }

  setup = async () => {
    const tokenData = await storage.retrieveToken();
    runInAction(() => {
      this.token = tokenData.token;
      this.tokenExpiration = tokenData.tokenExpiration;
    });
  };

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
    runInAction(() => {
      this.token = undefined;
      this.tokenExpiration = undefined;
      this.user = undefined;
    });
    // TODO: storage deletion not needed, since this will be done via reaction, correct?
  };

  register = async (form: UserForm) => await userApi.register(form);

  sendVerificationEmail = async (email: string) => await userApi.sendVerificationEmail(email);

  verify = async (token: string) => await userApi.verify(token);

  sendResetPasswordEmail = async (email: string) => await userApi.sendResetPasswordEmail(email);

  verifyResetPasswordToken = async (token: string) => await userApi.verifyResetPasswordToken(token);

  resetPassword = async (password: string, token: string) => await userApi.resetPassword(password, token);
}
