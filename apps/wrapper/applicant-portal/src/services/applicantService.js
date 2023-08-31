import { APIS } from "../constants";
import axiosService from "./axiosService";
import paymentService from "./paymentService";

const NOTIFICATION_BASE_URL =
  process.env.REACT_APP_PUSH_NOTIFICATION || "http://localhost:8080/api/";

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

const getNotifications = async () => {
  const res = await axiosService.post(
    APIS.notifications.getNotifications
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

// payment service
const initiatePayment = async (postData) => {
  const res = await paymentService.post(APIS.PAYMENT.GENERATE_LINK, postData);
  return res;
};

const updateApplicantDeviceId = async (postData) => {
  const res = await axiosService.put(
    APIS.COMMON.UPDATE_APPLICANT_DEVICE_ID,
    postData
  );
  return res;
};

// new notification APIs
export const sendPushNotification = async (postData) => {
  const res = await axiosService.post(
    `${NOTIFICATION_BASE_URL}${APIS.notifications.sendPushNotification}`,
    postData
  );
  return res;
};

export const getAllRegulatorDeviceId = async (postData) => {
  const res = await axiosService.get(
    APIS.notifications.getAllRegulatorDeviceId,
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
  readNotification,
  initiatePayment,
  updateApplicantDeviceId,
  sendPushNotification,
  getAllRegulatorDeviceId
};
