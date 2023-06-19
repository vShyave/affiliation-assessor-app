import axios from "axios";
// import { getCookie } from '../utils';

const BASE_URL =
  process.env.REACT_APP_FUSION_AUTH_URL || "https://api.upsmfac.org/api/";
const AUTH_KEY =
  process.env.REACT_APP_FUSION_AUTH_API_KEY || "testkeytestkeytestkey";

const fusionAuthAxiosService = axios.create({
  baseURL: BASE_URL,
});

fusionAuthAxiosService.interceptors.request.use(
  (request) => {
    // const user_data = getCookie('userData');
    request.headers["Accept"] = "application/json";
    request.headers["Content-Type"] = "application/json";
    request.headers["Authorization"] = AUTH_KEY;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fusionAuthAxiosService.interceptors.response.use(
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

export default fusionAuthAxiosService;
