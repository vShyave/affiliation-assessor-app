import axios from 'axios';
const BASE_URL = process.env.WEB_PORTAL_USER_SERVICE_URL || "http://35.207.216.26:3003/";
const REGISTRATION_BASE_URL = process.env.FUSION_AUTH_URL  || "http://35.207.216.26:9011/api/"

const login = async (phone) => {
    try {
        const res = await axios.get(BASE_URL + "user/otpSend?phone="+phone);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

const verifyOtp = async (phone, otp) => {
    try {
        const res = await axios.get(BASE_URL + "user/otpVerify?phone="+phone+"&otp="+otp);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

const signup  = async (userDetails) => {
  try {
    const res = await axios.post(REGISTRATION_BASE_URL + "user/registration", userDetails);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export const userService = {
  login,
  verifyOtp,
  signup,
};