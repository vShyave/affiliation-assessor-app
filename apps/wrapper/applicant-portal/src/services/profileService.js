import { APIS } from "../constants";
import axiosService from "./axiosService";

const getProfileView = (profileViewDetails) => {
  return axiosService.post(APIS.PROFILE.VIEW_PROFILE, profileViewDetails);
};


const getProfileEdit = (profileEditDetails) => {
    return axiosService.put(APIS.PROFILE.EDIT_PROFILE, profileEditDetails);
  };
  
  export const profileService = {
    getProfileView,
    getProfileEdit
  };