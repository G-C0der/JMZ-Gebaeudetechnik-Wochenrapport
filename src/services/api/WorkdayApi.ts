import { Api } from "./Api";
import { Workday } from "../../types";

class WorkdayApi extends Api {
  basePath = '/workdays';

  save = async (form: Workday) => {
    const { data } = await this.api.post(this.basePath, form);
    return data;
  };
}

export default new WorkdayApi();
