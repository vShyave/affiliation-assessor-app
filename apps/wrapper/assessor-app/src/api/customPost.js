import axios from 'axios';
import { getCookie } from '../utils';

const BASE_URL = process.env.REACT_APP_HASURA_SERVICE_URL;

const customPost = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Accept: 'application/json',
  //   'Hasura-Client-Name': process.env.REACT_APP_HASURA_CLIENT_NAME,
  //   'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET_KEY
  // }
});

customPost.interceptors.request.use(
  (request) => {
    const user_data = getCookie('userData');
    console.log('user_data - ', user_data);
    request.headers['Accept'] = 'application/json';
    request.headers['Content-Type'] = 'application/json';
    request.headers['Authorization'] = `Bearer ${user_data.token}`;
    // request.headers['Hasura-Client-Name'] = process.env.REACT_APP_HASURA_CLIENT_NAME;
    // request.headers['x-hasura-admin-secret'] = process.env.REACT_APP_HASURA_ADMIN_SECRET_KEY;
    console.log('request sent');
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customPost;
