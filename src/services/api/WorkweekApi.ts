import { Api } from "./Api";
import { User, Workweek } from "../../types";

class WorkweekApi extends Api {
  basePath = '/workweeks';

  fetch = async (workdayDate: Date, viewUserId?: User['id'])=> {
    const { data } = await this.api.get(`${this.basePath}/fetch/${workdayDate}${viewUserId ? `/${viewUserId}` : ''}`);
    return data;
  };

  list = async (userId: number, year: number) => {
    const { data } = await this.api.get(`${this.basePath}/list/${userId}/${year}`);
    return data;
  };

  approve = async (workweekIds: Workweek['id'][]) => {
    const { data: { data } } = await this.api.patch(this.basePath, { ids: workweekIds });
    return data;
  };
}

export default new WorkweekApi();
