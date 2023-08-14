import { APIS } from "../constants";
import  axiosService  from "./axiosService";

const getData = (requestPayoad) => {
  return axiosService.post(APIS.FORMS.LIST, requestPayoad);
}
const searchForm = (postData) => {
  return axiosService.post(APIS.SEARCH.SEARCH_FORM,postData)
}

export const formService = {
  getData,
  searchForm
};