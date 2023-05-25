import axios from 'axios';
// import { getCookie } from '../utils';

const BASE_URL = process.env.REACT_APP_FILE_CONVERSION_URL;
const HASURA_CLIENT_NAME = process.env.HASURA_CLIENT_NAME || 'hasura-console';
const X_HASURA_ADMIN_SECRET_KEY = process.env.X_HASURA_ADMIN_SECRET_KEY || 'myadminsecretkey';

const fileConversionCustomPost = axios.create({
  baseURL: BASE_URL,
});

fileConversionCustomPost.interceptors.request.use(
  (request) => {
    // const user_data = getCookie('userData');
//     request.headers['Accept'] = 'application/json';
    request.headers['Content-Type'] = 'multipart/form-data';
//     request.headers['Hasura-Client-Name'] = HASURA_CLIENT_NAME;
//     request.headers['x-hasura-admin-secret'] = X_HASURA_ADMIN_SECRET_KEY;
    // request.headers['Authorization'] = `Bearer ${user_data.token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fileConversionCustomPost;
