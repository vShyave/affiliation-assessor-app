import axios from 'axios';
import fusionAuthAxiosService from "./fusionAuthAxiosService";

const BASE_URL = process.env.WEB_PORTAL_USER_SERVICE_URL || "http://35.207.216.26:3003/";
// const BASE_URL = "http://localhost:3001/";
const REGISTRATION_BASE_URL = process.env.FUSION_AUTH_URL  || "http://35.207.216.26:9011/api/";
const AUTH_KEY = process.env.FUSION_AUTH_API_KEY || "testkeytestkeytestkey";

const sendOtp = async (phone) => {
    try {
        const res = await axios.get(BASE_URL + "user/otpSend?phone="+phone);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

const verifyOtp = async (phone, otp) => {
    // const otpDetails ={
    //   phone,
    //   otp,
    //   applicationId: process.env.REACT_APP_APPLICATION_ID
    // }
    try {
        // const res = await axios.post(BASE_URL + "user/otpVerify", otpDetails);
        const res = await axios.get(BASE_URL + "user/otpVerify?phone="+phone+"&otp="+otp);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

const signup  = async (userDetails) => {
  try {
    const res = await fusionAuthAxiosService.post("user/registration", userDetails);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

const login = async (userDetails) => {
  try {
    const res = await fusionAuthAxiosService.post("login", userDetails);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export const userService = {
  sendOtp,
  login,
  verifyOtp,
  signup,
};