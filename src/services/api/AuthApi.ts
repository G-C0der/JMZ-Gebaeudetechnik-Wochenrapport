import {Api} from "./Api";
import {Credentials} from "../../types";

class AuthApi extends Api {
  basePath = '/auth';

  login = async (credentials: Credentials) => {
    const { data } = await this.api.post(this.basePath, credentials);
    return data;
  };

  getAuthenticatedUser =  async () => {
    const { data } = await this.api.get(this.basePath);
    return data;
  };
}

export default new AuthApi();