import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getPaperList(params) {
  return request.get('api/paper/admin/getPaperLists', {
    params,
  });
}

export function addPaper(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      // file list
      if (key === 'fileList') {
        Array.from(params[key]).forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, params[key]);
      }
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/paper/admin/uploadPaper`, formData, config);
}

export function deletePaper(params) {
  return request.get('api/paper/admin/deletePaper', {
    params,
  });
}
