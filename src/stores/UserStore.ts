import { resetStores, Store } from "./index";
import { computed, makeAutoObservable, reaction, runInAction } from "mobx";
import { Credentials, User, UserForm } from "../types";
import { authApi, storage, userApi, navigate } from "../services";
import { isTokenExpired, logResponseErrorMessage } from "./utils";
import Toast from "react-native-toast-message";

const initialState = {
  token: undefined,
  tokenExpiration: undefined,
  user: null,

  isSetupDone: false,

  isLoginLoading: false,
  isRegisterLoading: false,
  isSendVerificationEmailLoading: false,
  isVerifyLoading: false,
  isSendResetPasswordEmailLoading: false,
  isVerifyResetPasswordTokenLoading: false,
  isResetPasswordLoading: false
};

export class UserStore implements Store {
  private token?: string = initialState.token;
  private tokenExpiration?: string = initialState.tokenExpiration;
  user: User | null = initialState.user;

  isSetupDone = initialState.isSetupDone;

  isLoginLoading = initialState.isLoginLoading;
  isRegisterLoading = initialState.isRegisterLoading;
  isSendVerificationEmailLoading = initialState.isSendVerificationEmailLoading;
  isVerifyLoading = initialState.isVerifyLoading;
  isSendResetPasswordEmailLoading = initialState.isSendResetPasswordEmailLoading;
  isVerifyResetPasswordTokenLoading = initialState.isVerifyResetPasswordTokenLoading;
  isResetPasswordLoading = initialState.isResetPasswordLoading;

  constructor() {
    makeAutoObservable(this, {
      isLoggedIn: computed,
      isAdmin: computed
    });
    this.logout = this.logout.bind(this);

    // Storage update
    reaction(
      () => [this.token, this.tokenExpiration],
      ([token, tokenExpiration]) => {
        if (token && tokenExpiration) {
          const storeToken = async () => await storage.storeToken(this.token!, this.tokenExpiration!);
          storeToken();
        }
        else {
          const deleteToken = async () => await storage.deleteToken();
          deleteToken();
        }
      }
    );

    // Token expiration handling
    reaction(
      () => this.tokenExpiration,
      (tokenExpiration) => this.handleTokenExpiration(tokenExpiration)
    );

    // User sync
    reaction(
      () => [this.token, this.user],
      ([token, user]) => {
        if (token && this.tokenExpiration && !user) {
          try {
            authApi.getAuthenticatedUser().then(({ user }) => {
              if (!user) this.logout();
              else runInAction(() => this.user = user);
            });
          } catch (err) {
            logResponseErrorMessage(err);
          }
        }
      }
    );
  }

  setup = async () => {
    const tokenData = await storage.retrieveToken();
    if (tokenData) {
      runInAction(() => {
        this.token = tokenData.token;
        this.tokenExpiration = tokenData.tokenExpiration;
      });
    }
    runInAction(() => this.isSetupDone = true);
  };

  reset = () => {
    Object.assign(this, initialState);
  };

  handleTokenExpiration = (tokenExpiration?: string) => {
    if (this.isLoggedIn && isTokenExpired(tokenExpiration ?? this.tokenExpiration)) {
      this.logout();

      Toast.show({
        type: 'error',
        text1: 'Session expired.'
      });
    }
  };

  get isLoggedIn (): boolean {
    return !!(this.token && this.tokenExpiration);
  }

  get isAdmin (): boolean {
    return this.isLoggedIn && this.user!.admin;
  }

  login = async (credentials: Credentials) => {
    this.isLoginLoading = true;
    try {
      const { token, expiration, user } = await authApi.login(credentials);

      if (typeof token !== 'string' || !token.length || !expiration || !user) return;

      runInAction(() => {
        this.token = token;
        this.tokenExpiration = expiration;
        this.user = user;

        this.isLoginLoading = initialState.isLoginLoading;
      });

      navigate('reportScreen');

      return true;
    } catch (err) {
      logResponseErrorMessage(err);

      runInAction(() => this.isLoginLoading = initialState.isLoginLoading);
    }
  };

  logout = () => {
    resetStores();

    setTimeout(() => navigate('loginScreen'), 0); // Push to end of event queue
  };

  register = async (form: UserForm) => {
    this.isRegisterLoading = true;
    try {
      await userApi.register(form);
      runInAction(() => this.isRegisterLoading = initialState.isRegisterLoading);
    } catch (err) {
      logResponseErrorMessage(err);

      runInAction(() => this.isRegisterLoading = initialState.isRegisterLoading);
    }
  };

  sendVerificationEmail = async (email: string) => {
    this.isSendVerificationEmailLoading = true;
    try {
      await userApi.sendVerificationEmail(email);
      runInAction(() => this.isSendVerificationEmailLoading = initialState.isSendVerificationEmailLoading);
    } catch (err) {
      logResponseErrorMessage(err);

      runInAction(() => this.isSendVerificationEmailLoading = initialState.isSendVerificationEmailLoading);
    }
  };

  verify = async (token: string) => {
    this.isVerifyLoading = true;
    try {
      await userApi.verify(token);
      runInAction(() => this.isVerifyLoading = initialState.isVerifyLoading);
    } catch (err) {
      logResponseErrorMessage(err);

      runInAction(() => this.isVerifyLoading = initialState.isVerifyLoading);
    }
  };

  sendResetPasswordEmail = async (email: string) => {
    this.isSendResetPasswordEmailLoading = true;
    try {
      await userApi.sendResetPasswordEmail(email);
      runInAction(() => this.isSendResetPasswordEmailLoading = initialState.isSendResetPasswordEmailLoading);
    } catch (err) {
      logResponseErrorMessage(err);

      runInAction(() => this.isSendResetPasswordEmailLoading = initialState.isSendResetPasswordEmailLoading);
    }
  };

  verifyResetPasswordToken = async (token: string) => {
    this.isVerifyResetPasswordTokenLoading = true;
    try {
      await userApi.verifyResetPasswordToken(token);
      runInAction(() => this.isVerifyResetPasswordTokenLoading = initialState.isVerifyResetPasswordTokenLoading);
    } catch (err) {
      logResponseErrorMessage(err);

      runInAction(() => this.isVerifyResetPasswordTokenLoading = initialState.isVerifyResetPasswordTokenLoading);
    }
  };

  resetPassword = async (password: string, token: string) => {
    this.isResetPasswordLoading = true;
    try {
      await userApi.resetPassword(password, token);
      runInAction(() => this.isResetPasswordLoading = initialState.isResetPasswordLoading);
    } catch (err) {
      logResponseErrorMessage(err);

      runInAction(() => this.isResetPasswordLoading = initialState.isResetPasswordLoading);
    }
  };
}
