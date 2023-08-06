import { APIS } from "../constants";
import axiosService from "./axiosService";

const addInstitute = (instituteDetails) => {
  return axiosService.post(APIS.APPLICANT.ADD_INSTITUTE, instituteDetails);
};

const addInstitutePoc = (institutePocDetails) => {
  return axiosService.post(
    APIS.APPLICANT.ADD_INSTITUTE_POC,
    institutePocDetails
  );
};

const getApplicantDetails = (applicantDetails) => {
  return axiosService.post(
    APIS.APPLICANT.GET_APPLICANT_DETAILS,
    applicantDetails
  );
};

// Notifications APIs
const insertNotifications = async (postData) => {
  const res = await axiosService.post(
    APIS.notifications.insertNotifications,
    postData
  );
  return res;
};

const getNotifications = async (postData) => {
  const res = await axiosService.post(
    APIS.notifications.getNotifications,
    postData
  );
  return res;
};

const readNotification = async (postData) => {
  const res = await axiosService.put(
    APIS.notifications.readNotification,
    postData
  );
  return res;
};

export const applicantService = {
  addInstitute,
  addInstitutePoc,
  getApplicantDetails,
  insertNotifications,
  getNotifications,
  readNotification
};
