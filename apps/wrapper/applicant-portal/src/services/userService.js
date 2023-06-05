import axios from "axios";
import fusionAuthAxiosService from "./fusionAuthAxiosService";
import { APIS } from "../constants";

const BASE_URL =
  //"https://api.upsmfac.org/";

  process.env.WEB_PORTAL_USER_SERVICE_URL || "http://35.207.216.26:3003/";
// const BASE_URL = "http://localhost:3001/";
const REGISTRATION_BASE_URL =
  process.env.FUSION_AUTH_URL || "http://35.207.216.26:9011/api/";
const AUTH_KEY = process.env.FUSION_AUTH_API_KEY || "testkeytestkeytestkey";

const sendOtp = (phone) => {
  console.log("URL", BASE_URL);
  return axios.get(`${BASE_URL}${APIS.LOGIN.OTP_SEND}?phone=${phone}`);
};

const verifyOtp = (phone, otp) => {
  // const otpDetails ={
  //   phone,
  //   otp,
  //   applicationId: process.env.REACT_APP_APPLICATION_ID
  // }
  // const res = await axios.post(BASE_URL + "user/otpVerify", otpDetails);
  return axios.get(
    `${BASE_URL}${APIS.LOGIN.OTP_VERIFY}?phone=${phone}&otp=${otp}`
  );
};

const signup = (userDetails) => {
  console.log("FA url", APIS.SIGNUP.FUSION_AUTH_REGISTRATION);
  return fusionAuthAxiosService.post(
    APIS.SIGNUP.FUSION_AUTH_REGISTRATION,
    userDetails
  );
};

const login = (userDetails) => {
  return fusionAuthAxiosService.post(APIS.LOGIN.USERLOGIN, userDetails);
};

export const userService = {
  sendOtp,
  login,
  verifyOtp,
  signup,
};
