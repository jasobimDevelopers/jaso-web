import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getValueOutputList(params) {
  return request.get('api/ValueOutput/admin/getValueOutputLists', {
    params,
  });
}

export function deleteValueOutput(params) {
  return request.get('api/ValueOutput/deleteValueOutput', {
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

  return axios.post(`${apiRoot}/api/ValueOutput/addValueOutput`, formData, config);
}
