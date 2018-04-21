import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getUserTeamList(params) {
  return request.get('api/userTeam/admin/getUserTeamList', {
    params,
  });
}

export function addUserTeam(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/userTeam/admin/addUserTeam`, formData, config);
}

export function updateUserTeam(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/userTeam/admin/updateUserTeam`, formData, config);
}

export function deleteUserTeam(params) {
  return request.get('api/userTeam/admin/deleteUserTeam', {
    params,
  });
}

