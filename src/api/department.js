import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getDepartmentList(params) {
  return request.get('api/department/admin/getDepartmentList', {
    params,
  });
}

export function addDepartment(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/department/admin/addDepartment`, formData, config);
}

export function updateDepartment(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/department/admin/updateDepartment`, formData, config);
}

export function deleteDepartment(params) {
  return request.get('api/department/admin/deleteDepartment', {
    params,
  });
}
