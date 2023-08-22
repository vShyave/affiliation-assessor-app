import axios from "axios";
import { getCookie } from "../utils";

const BASE_URL = process.env.REACT_APP_PAYMENT_URL;

const paymentService = axios.create({
  baseURL: BASE_URL,
});

const spinner = document.getElementById("backdrop");

paymentService.interceptors.request.use(
  (request) => {
    const user_data = getCookie("userData");
    spinner.style.display = "flex";
    request.headers["Accept"] = "application/json";
    request.headers["Content-Type"] = "application/json";
    return request;
  },
  (error) => {
    spinner.style.display = "none";
    return Promise.reject(error);
  }
);

paymentService.interceptors.response.use(
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

export default paymentService;
