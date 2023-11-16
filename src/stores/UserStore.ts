import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Credentials, User, UserForm } from "../types";
import { authApi, storage, userApi, navigate } from "../services";
import { isTokenExpired, logErrorMessage } from "./utils";

export class UserStore {
  token: string | undefined;
  tokenExpiration: string | undefined;
  user: User | undefined;

  loginLoading = false;
  registerLoading = false;
  sendVerificationEmailLoading = false;
  verifyLoading = false;
  sendResetPasswordEmailLoading = false;
  verifyResetPasswordTokenLoading = false;
  resetPasswordLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.logout = this.logout.bind(this);

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
    if (!tokenData) return;
    runInAction(() => {
      this.token = tokenData.token;
      this.tokenExpiration = tokenData.tokenExpiration;
    });
  };

  login = async (credentials: Credentials) => {
    this.loginLoading = true;
    try {
      const { token, expiration, user } = await authApi.login(credentials);

      if (typeof token !== 'string' || !token.length || !expiration || !user) return;

      runInAction(() => {
        this.token = token;
        this.tokenExpiration = expiration;
        this.user = user;

        this.loginLoading = false;
      });

      navigate('Home');
    } catch (err) {
      logErrorMessage(err);
    }
  };

  logout = () => {
    runInAction(() => {
      this.token = undefined;
      this.tokenExpiration = undefined;
      this.user = undefined;
    });
    // TODO: storage deletion not needed, since this will be done via reaction, correct?

    navigate('Login');
  };

  register = async (form: UserForm) => {
    this.registerLoading = true;
    try {
      await userApi.register(form);
      runInAction(() => this.registerLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  sendVerificationEmail = async (email: string) => {
    this.sendVerificationEmailLoading = true;
    try {
      await userApi.sendVerificationEmail(email);
      runInAction(() => this.sendVerificationEmailLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  verify = async (token: string) => {
    this.verifyLoading = true;
    try {
      await userApi.verify(token);
      runInAction(() => this.verifyLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  sendResetPasswordEmail = async (email: string) => {
    this.sendResetPasswordEmailLoading = true;
    try {
      await userApi.sendResetPasswordEmail(email);
      runInAction(() => this.sendResetPasswordEmailLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  verifyResetPasswordToken = async (token: string) => {
    this.verifyResetPasswordTokenLoading = true;
    try {
      await userApi.verifyResetPasswordToken(token);
      runInAction(() => this.verifyResetPasswordTokenLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  resetPassword = async (password: string, token: string) => {
    this.resetPasswordLoading = true;
    try {
      await userApi.resetPassword(password, token);
      runInAction(() => this.resetPasswordLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };
}
