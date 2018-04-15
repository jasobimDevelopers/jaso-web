import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getRoleList(params) {
  return request.get('api/role/admin/getRoleList', {
    params,
  });
}

export function addRole(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/role/admin/addRole`, formData, config);
}

export function updateRole(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/role/admin/updateRole`, formData, config);
}

export function deleteRole(params) {
  return request.get('api/role/admin/deleteRole', {
    params,
  });
}

