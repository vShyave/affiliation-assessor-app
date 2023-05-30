import { APIS } from "../constants";
import axiosService from "./axiosService";

const getData = (requestPayoad) => {
  return axiosService.post(APIS.APPLICATIONS.STATUS_LIST, requestPayoad);
};

export const applicationService = {
  getData,
};
