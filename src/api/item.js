import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getItemList(params) {
  return request.get('api/item/admin/getItemList', {
    params,
  });
}

export function addItem(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      // file list
      if (key === 'fileList') {
        params[key].forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, params[key]);
      }
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/item/admin/uploadItem`, formData, config);
}

export function getItemByBuidlingInfo(params) {
  return request.get('api/item/getItemByBuidlingInfo', {
    params,
  });
}

export function getDuctStatusSum(params) {
  return request.get('api/duct/getDuctStateSum', {
    params,
  });
}

export function getDuctList(params) {
  return request.get('api/duct/getDuctList', {
    params,
  });
}

export function exportDuct(params) {
  return request.get('api/duct/admin/exportDuct', {
    params,
  });
}

export function getItemBySelfId(params) {
  return request.get('/api/item/admin/getItemBySelfId', {
    params,
  });
}
