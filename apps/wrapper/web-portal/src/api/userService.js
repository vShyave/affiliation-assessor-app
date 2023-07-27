import axios from "axios";
import API_URL from "./apiUrl";

const BASE_URL =
  process.env.REACT_APP_WEB_PORTAL_USER_SERVICE_URL ||
  "https://auth.upsmfac.org/api/v1/";

  const keyCloakAxiosService = axios.create({
    baseURL: BASE_URL,
  });
  
  keyCloakAxiosService.interceptors.request.use(
    (request) => {
      // const user_data = getCookie('userData');
      request.headers["Accept"] = "*/*";
      request.headers["Content-Type"] = "application/json";
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  keyCloakAxiosService.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401) {
        console.error("Unauthorized  user. Status Code: " + res.status);
        // window.location.href = “https://example.com/login”;
      }
      console.error("Looks like there was a problem. Status Code: " + res.status);
      return Promise.reject(res?.data?.error);
    }
  );

const generateOtp = (postData) => {
  return axios.post(`${BASE_URL}${API_URL.LOGIN.GENERATE_OTP}`,postData);
};


const signup = (userDetails) => {
  return keyCloakAxiosService.post(
    API_URL.SIGNUP.CREATE_USER,
    userDetails
  );
};

const login = (userDetails) => {
  return keyCloakAxiosService.post(API_URL.LOGIN.USERLOGIN, userDetails);
};

export const userService = {
  generateOtp,
  login,
  signup
};
