import axios from 'axios';
const BASE_URL = "http://localhost:3001/user"

const login = async (phone) => {
    try {
        const res = await axios.get(BASE_URL + "/otpSend?phone="+phone);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

const verifyOtp = async (phone, otp) => {
    try {
        const res = await axios.get(BASE_URL + "/otpVerify?phone="+phone+"&otp="+otp);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

export const userService = {
  login,
  verifyOtp
};