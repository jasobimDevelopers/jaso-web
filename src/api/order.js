import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getAdvancedOrderList(params) {
  return request.get('api/advancedOrder/admin/getAdvancedOrderList', {
    params,
  });
}

export function addAdvancedOrder(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      // file list
      if (key === 'contentFiles') {
        Array.from(params[key]).forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, params[key]);
      }
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/advancedOrder/addAdvancedOrder`, formData, config);
}

export function deleteAdvancedOrder(params) {
  return request.get('api/advancedOrder/deleteAdvancedOrder', {
    params,
  });
}

export function updateAdvancedOrder(params) {
  return request.post('api/advancedOrder/updateAdvancedOrder', params);
}
