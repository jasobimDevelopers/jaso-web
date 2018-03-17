import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getQuantityList(params) {
  return request.get('api/quantity/getQuantityList', {
    params,
  });
}

export function addQuantity(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      // file list
      if (key === 'fileList') {
        Array.from(params[key]).forEach((file) => {
          formData.append('file', file);
        });
      } else {
        formData.append(key, params[key]);
      }
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/quantity/admin/uploadQuantity`, formData, config);
}

export function exportQuantity(params) {
  return request.get('api/quantity/exportQuantity', {
    params,
  });
}
