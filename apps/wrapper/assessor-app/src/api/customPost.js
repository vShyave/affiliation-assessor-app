import axios from 'axios';
const BASE_URL = process.env.REACT_APP_HASURA_SERVICE_URL;

const customPost = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Hasura-Client-Name': process.env.REACT_APP_HASURA_CLIENT_NAME,
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET_KEY
  }
});

export default customPost;
