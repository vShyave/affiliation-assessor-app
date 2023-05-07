import axios from 'axios';
// import { getCookie } from '../utils';

const BASE_URL = process.env.WEB_PORTAL_HASURA_API_URL || 'https://hasura.upsmfac.org/api/';
const HASURA_CLIENT_NAME = process.env.HASURA_CLIENT_NAME || 'hasura-console';
const X_HASURA_ADMIN_SECRET_KEY = process.env.X_HASURA_ADMIN_SECRET_KEY || 'myadminsecretkey';

const adminCustomPost = axios.create({
  baseURL: BASE_URL,
});

adminCustomPost.interceptors.request.use(
  (request) => {
    console.log('baseurl - ', BASE_URL);
    // const user_data = getCookie('userData');
    request.headers['Accept'] = 'application/json';
    request.headers['Content-Type'] = 'application/json';
    request.headers['Hasura-Client-Name'] = HASURA_CLIENT_NAME;
    request.headers['x-hasura-admin-secret'] = X_HASURA_ADMIN_SECRET_KEY;
    // request.headers['Authorization'] = `Bearer ${user_data.token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default adminCustomPost;
