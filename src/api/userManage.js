import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getUserList(params) {
  return request.get('api/user/admin/getUserList', {
    params,
  });
}

export function getUserTeam(params) {
  return request.get('api/user/getUserTeam', {
    params,
  });
}

export function getUser(params) {
  return request.get('api/user/admin/getUserDetails', {
    params,
  });
}

export function addUser(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/user/admin/addUser`, formData, config);
}

export function updateUser(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/user/admin/updateUser`, formData, config);
}

export function deleteUser(params) {
  return request.get('api/user/admin/deleteUser', {
    params,
  });
}
