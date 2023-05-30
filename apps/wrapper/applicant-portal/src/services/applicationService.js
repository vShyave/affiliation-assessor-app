import { APIS } from "../constants";
import axiosService from "./axiosService";

const getData = (requestPayload) => {
  return axiosService.post(APIS.APPLICATIONS.STATUS_LIST, requestPayload);
};

export const applicationService = {
  getData,
};
