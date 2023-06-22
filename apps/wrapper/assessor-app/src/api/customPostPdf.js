import axios from 'axios';
import { getCookie } from '../utils';

const BASE_URL = process.env.REACT_APP_PDF_DOWNLOAD_URL;

const customPostPdf = axios.create({
  baseURL: BASE_URL,
});

customPostPdf.interceptors.request.use(
  (request) => {
    const user_data = getCookie('userData');
    request.headers['Accept'] = 'application/json';
    request.headers['Content-Type'] = 'application/json';
    request.headers['Authorization'] = `Bearer ${user_data.token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customPostPdf;