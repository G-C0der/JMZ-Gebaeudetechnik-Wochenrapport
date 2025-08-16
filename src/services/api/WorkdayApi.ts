import { Api } from "./Api";
import { WorkdayFormMapped } from "../../types";

class WorkdayApi extends Api {
  basePath = '/workdays';

  save = async (form: WorkdayFormMapped) => {
    const { data } = await this.api.post(this.basePath, form);
    return data;
  };
}

export default new WorkdayApi();
