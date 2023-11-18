import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Credentials, User, UserForm } from "../types";
import { authApi, storage, userApi, navigate } from "../services";
import { isTokenExpired, logErrorMessage } from "./utils";

export class UserStore {
  token: string | undefined;
  tokenExpiration: string | undefined;
  user: User | undefined;

  isLoginLoading = false;
  isRegisterLoading = false;
  isSendVerificationEmailLoading = false;
  isVerifyLoading = false;
  isSendResetPasswordEmailLoading = false;
  isVerifyResetPasswordTokenLoading = false;
  isResetPasswordLoading = false;

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
    this.isLoginLoading = true;
    try {
      const { token, expiration, user } = await authApi.login(credentials);

      if (typeof token !== 'string' || !token.length || !expiration || !user) return;

      runInAction(() => {
        this.token = token;
        this.tokenExpiration = expiration;
        this.user = user;

        this.isLoginLoading = false;
      });

      navigate('Rapport');
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
    this.isRegisterLoading = true;
    try {
      await userApi.register(form);
      runInAction(() => this.isRegisterLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  sendVerificationEmail = async (email: string) => {
    this.isSendVerificationEmailLoading = true;
    try {
      await userApi.sendVerificationEmail(email);
      runInAction(() => this.isSendVerificationEmailLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  verify = async (token: string) => {
    this.isVerifyLoading = true;
    try {
      await userApi.verify(token);
      runInAction(() => this.isVerifyLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  sendResetPasswordEmail = async (email: string) => {
    this.isSendResetPasswordEmailLoading = true;
    try {
      await userApi.sendResetPasswordEmail(email);
      runInAction(() => this.isSendResetPasswordEmailLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  verifyResetPasswordToken = async (token: string) => {
    this.isVerifyResetPasswordTokenLoading = true;
    try {
      await userApi.verifyResetPasswordToken(token);
      runInAction(() => this.isVerifyResetPasswordTokenLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };

  resetPassword = async (password: string, token: string) => {
    this.isResetPasswordLoading = true;
    try {
      await userApi.resetPassword(password, token);
      runInAction(() => this.isResetPasswordLoading = false);
    } catch (err) {
      logErrorMessage(err);
    }
  };
}
