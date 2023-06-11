import axios from "axios";
import fusionAuthAxiosService from "./fusionAuthAxiosService";
import API_URL from "./apiUrl";

const BASE_URL =
  process.env.WEB_PORTAL_USER_SERVICE_URL || "https://api.upsmfac.org/";
// const BASE_URL = "http://localhost:3001/";
const REGISTRATION_BASE_URL =
  process.env.FUSION_AUTH_URL || "http://35.207.216.26:8081/api/";
const AUTH_KEY = process.env.FUSION_AUTH_API_KEY || "testkeytestkeytestkey";

const sendOtp = (phone) => {
  return axios.get(`${BASE_URL}${API_URL.LOGIN.OTP_SEND}?phone=${phone}`);
};

const verifyOtp = (phone, otp) => {
  // const otpDetails ={
  //   phone,
  //   otp,
  //   applicationId: process.env.REACT_APP_APPLICATION_ID
  // }
  // const res = await axios.post(BASE_URL + "user/otpVerify", otpDetails);
  return axios.get(
    `${BASE_URL}${API_URL.LOGIN.OTP_VERIFY}?phone=${phone}&otp=${otp}`
  );
};

const signup = (userDetails) => {
  return fusionAuthAxiosService.post(
    API_URL.SIGNUP.FUSION_AUTH_REGISTRATION,
    userDetails
  );
};

const login = (userDetails) => {
  return fusionAuthAxiosService.post(API_URL.LOGIN.USERLOGIN, userDetails);
};

export const userService = {
  sendOtp,
  login,
  verifyOtp,
  signup,
};
