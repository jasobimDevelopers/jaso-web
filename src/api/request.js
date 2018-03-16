import axios from 'axios';
import https from 'https';
import querystring from 'querystring';
import { getToken } from '@/utils/auth';
import { Message } from 'element-ui';

// session id name
// const sessionId = 'access_token';

// api root
// const apiRoot = 'http://localhost:8080/jasobim/';
export const apiRoot = '/apis';

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
    const { method } = config;
    const token = getToken();

    if (method === 'get') {
      config.params = {
        ...config.params,
        token,
      };
    } else {
      config.data = {
        ...config.data,
        token,
      };
    }

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
    const { callStatus, errorCode } = res;

    if (callStatus !== 'SUCCEED') {
      Message.error(errorCode);
      return Promise.reject(res);
    }

    return response.data;
  },
  (error) => {
    console.log('err', error); // for debug
    return Promise.reject(error);
  },
);

request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const config = {
  headers: { 'Content-Type': 'multipart/form-data' },
};

export default request;
