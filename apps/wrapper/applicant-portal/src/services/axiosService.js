import axios from "axios";
// import { getCookie } from '../utils';

const BASE_URL = process.env.REACT_APP_NODE_URL;
const HASURA_CLIENT_NAME =
  process.env.REACT_APP_HASURA_CLIENT_NAME || "hasura-console";
const X_HASURA_ADMIN_SECRET_KEY =
  process.env.REACT_APP_X_HASURA_ADMIN_SECRET_KEY || "myadminsecretkey";

const axiosService = axios.create({
  baseURL: BASE_URL,
});

const spinner = document.getElementById("backdrop");

axiosService.interceptors.request.use(
  (request) => {
    // const user_data = getCookie('userData');
    spinner.style.display = "flex";
    request.headers["Accept"] = "application/json";
    request.headers["Content-Type"] = "application/json";
    // request.headers["Hasura-Client-Name"] = HASURA_CLIENT_NAME;
    // request.headers["x-hasura-admin-secret"] = X_HASURA_ADMIN_SECRET_KEY;
    request.headers["Authorization"] = process.env.REACT_APP_AUTH_TOKEN;
    return request;
  },
  (error) => {
    spinner.style.display = "none";
    return Promise.reject(error);
  }
);

axiosService.interceptors.response.use(
  function (response) {
    spinner.style.display = "none";
    return response;
  },
  function (error) {
    spinner.style.display = "none";
    let res = error.response;
    if (res.status === 401) {
      console.error("Unauthorized  user. Status Code: " + res.status);
      // window.location.href = “https://example.com/login”;
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(res?.data?.error);
  }
);

export default axiosService;
