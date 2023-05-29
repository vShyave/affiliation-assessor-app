import { APIS } from "../constants";
import  axiosService  from "./axiosService";

const getData = (postData) => {
  return axiosService.post(APIS.APPLICATIONS.STATUS_LIST, postData);
}

export const applicationService = {
  getData
};