import { APIS } from "../constants";
import  axiosService  from "./axiosService";

const getData = (requestPayoad) => {
  return axiosService.post(APIS.FORMS.LIST, requestPayoad);
}

export const formService = {
  getData
};