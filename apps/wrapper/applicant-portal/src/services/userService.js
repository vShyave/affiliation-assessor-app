import axios from 'axios';
import fusionAuthAxiosService from "./fusionAuthAxiosService";
import { APIS } from "../constants";

const BASE_URL = process.env.WEB_PORTAL_USER_SERVICE_URL || "http://35.207.216.26:3003/";
const REGISTRATION_BASE_URL = process.env.FUSION_AUTH_URL  || "http://35.207.216.26:9011/api/";
const AUTH_KEY = process.env.FUSION_AUTH_API_KEY || "testkeytestkeytestkey";

const sendOtp = (phone) => {
    return axios.get(`${BASE_URL}${APIS.LOGIN.OTP_SEND}?phone=${phone}`);
        
}

const verifyOtp = (phone, otp) => {  
  return axios.get(`${BASE_URL}${APIS.LOGIN.OTP_VERIFY}?phone=${phone}&otp=${otp}`);
}

const signup  = (userDetails) => {
  return fusionAuthAxiosService.post(APIS.SIGNUP.FUSION_AUTH_REGISTRATION, userDetails);
}

const login =  (userDetails) => {
  return fusionAuthAxiosService.post(APIS.LOGIN.USERLOGIN, userDetails);
}

export const userService = {
  sendOtp,
  login,
  verifyOtp,
  signup,
};