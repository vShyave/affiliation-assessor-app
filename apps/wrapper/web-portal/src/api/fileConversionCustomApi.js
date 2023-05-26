import axios from "axios";

const BASE_URL = process.env.REACT_APP_FILE_CONVERSION_URL;
const fileConversionCustomPost = axios.create({
  baseURL: BASE_URL,
});

fileConversionCustomPost.interceptors.request.use(
  (request) => {
    request.headers["Content-Type"] = "multipart/form-data";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fileConversionCustomPost;
