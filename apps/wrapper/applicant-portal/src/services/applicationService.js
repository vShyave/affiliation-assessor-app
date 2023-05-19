import { APIS } from "../constants";
import  axiosService  from "./axiosService";

const getData = () => {
  return axiosService.get(APIS.APPLICATIONS.STATUS_LIST);
}

export const applicationService = {
  getData
};