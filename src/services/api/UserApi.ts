import {Api} from "./Api";
import {UserForm} from "../../types";

class UserApi extends Api {
  basePath = '/users';

  register = async (form: UserForm) => {
    const { data } = await this.api.post(this.basePath, form);
    return data;
  };

  sendVerificationEmail = async (email: string) => {
    const { data } = await this.api.post(`${this.basePath}/verification`, { email });
    return data;
  };

  verify = async (token: string) => {
    const { data } = await this.api.patch(`${this.basePath}/verification/${token}`);
    return data;
  };

  sendResetPasswordEmail = async (email: string) => {
    const { data } = await this.api.post(`${this.basePath}/password-reset`, { email });
    return data;
  };

  verifyResetPasswordToken = async (token: string) => {
    const { data } = await this.api.get(`${this.basePath}/password-reset/${token}`);
    return data;
  };

  resetPassword = async (password: string, token: string) => {
    const { data } = await this.api.patch(`${this.basePath}/password-reset/${token}`, { password });
    return data;
  };

  list = async () => {
    const { data } = await this.api.get(this.basePath);
    return data;
  };

  changeActiveState = async (id: number) => {
    const { data } = await this.api.patch(`${this.basePath}/${id}/state-change`);
    return data;
  };
}

export default new UserApi();
