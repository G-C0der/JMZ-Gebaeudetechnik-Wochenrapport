import { Api } from "./Api";
import { WorkweekIdAlt } from "../../types";

class WorkweekApi extends Api {
  basePath = '/workweeks';

  fetch = async (workdayDate: Date)=> {
    const { data } = await this.api.get(`${this.basePath}/${workdayDate}`);
    return data;
  };

  approve = async (workweekIdAlt: WorkweekIdAlt) => {
    const { data } = await this.api.patch(this.basePath, workweekIdAlt);
    return data;
  };
}

export default new WorkweekApi();
