import { Api } from "./Api";
import axios from "axios";
import { WorkweekIdAlt } from "../../types";

class WorkweekApi extends Api {
  basePath = '/workweeks';

  fetch = async (workdayDate: Date)=> {
    const { data } = await axios.get(`${this.basePath}/${workdayDate}`);
    return data;
  };

  approve = async (workweekIdAlt: WorkweekIdAlt) => {
    const { data } = await axios.patch(this.basePath, workweekIdAlt);
  };
}

export default new WorkweekApi();
