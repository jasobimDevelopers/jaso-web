import axios from 'axios';
import https from 'https';
import querystring from 'querystring';
import { getToken } from '@/utils/auth';

// session id name
// const sessionId = 'access_token';

// api root
// const apiRoot = 'http://localhost:8080/jasobim/';
const apiRoot = '/apis';

const request = axios.create({
  baseURL: apiRoot,
  httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  transformRequest(data) {
    return querystring.stringify(data);
  },
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    // access token
    const { data } = config;
    const token = getToken();

    data.token = token;

    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  },
);

// respone interceptor
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log('res', res);

    return response.data;
  },
  (error) => {
    console.log('err', error); // for debug
    return Promise.reject(error);
  },
);

request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default request;
