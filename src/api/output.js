import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getValueOutputList(params) {
  return request.get('api/valueOutput/admin/getValueOutputLists', {
    params,
  });
}

export function deleteValueOutput(params) {
  return request.get('api/valueOutput/deleteValueOutput', {
    params,
  });
}

export function addValueOutput(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }
  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/valueOutput/addValueOutput`, formData, config);
}

export function getValueOutputByDate(params) {
  return request.get('api/valueOutput/getValueOutputByDate', {
    params,
  });
}

export function updateValueOutput(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }
  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/valueOutput/updateValueOutput`, formData, config);
}

export function exportValueOutput(params) {
  return request.get('api/valueOutput/exportValueOutput', {
    params,
  });
}
