import { Api } from "./Api";
import { WorkdayForm } from "../../types";

class WorkdayApi extends Api {
  basePath = '/workdays';

  save = async (form: WorkdayForm) => {
    const { data } = await this.api.post(this.basePath, form);
    return data;
  };
}

export default new WorkdayApi();
