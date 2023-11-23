import { Api } from "./Api";
import axios from "axios";
import { Workday } from "../../types";

class WorkdayApi extends Api {
  basePath = '/workdays';

  save = async (form: Workday) => {
    const { data } = await axios.post(this.basePath, form);
    return data;
  };
}

export default new WorkdayApi();
