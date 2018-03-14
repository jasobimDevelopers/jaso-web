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
