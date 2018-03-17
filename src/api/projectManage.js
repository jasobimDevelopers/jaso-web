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
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/project/admin/updateProject`, formData, config);
}

export function deleteProject(params) {
  return request.get('api/project/admin/deleteProject', {
    params,
  });
}

export function getProject(params) {
  return request.get('api/project/admin/getProjectDetails', {
    params,
  });
}

export function getBuildingInfo(params) {
  return request.get('api/building/admin/getBuildingByProjectId', {
    params,
  });
}
