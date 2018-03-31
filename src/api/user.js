import md5 from '@/utils/libs/md5';
import request from './request';

export function login(username, password) {
  const pwdStr = md5.hex_md5(password);
  return request.post('api/user/login', {
    username,
    password: pwdStr,
  });
}

export function getUserInfo() {
  return request.get('api/user/common/getUserInfo');
}

export function getCode(params) {
  return request.get('api/user/web/getIdentifyingCode', {
    params,
  });
}

export function verifyCode(params) {
  return request.get('api/user/web/getIdentifyingInfo', {
    params,
  });
}

export function registerUserInfo(params) {
  return request.post('api/user/web/registerUserInfo', params);
}

export function getUserList(params) {
  return request.get('api/user/admin/getUserList', {
    params,
  });
}
