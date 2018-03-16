import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getProjectList(params) {
  return request.get('api/project/admin/getProjectList', {
    params,
  });
}

export function addProject(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/project/admin/addProject`, formData, config);
}

export function updateProject(params) {
  return request.post('api/project/admin/updateProject', params);
}

export function deleteProject(params) {
  return request.get('api/project/admin/deleteProject', {
    params,
  });
}
