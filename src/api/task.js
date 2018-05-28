import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getConstructionTaskList(params) {
  return request.get('api/constructionTask/admin/getConstructionTaskList', {
    params,
  });
}

export function exportConstructionTaskById(params) {
  return request.get('api/constructionTask/exportConstructionTaskById', {
    params,
  });
}

export function addConstructionTask(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      // file list
      if (key === 'files') {
        Array.from(params[key]).forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, params[key]);
      }
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/constructionTask/admin/addConstructionTask`, formData, config);
}

export function deleteConstructionTask(params) {
  return request.get('api/constructionTask/deleteConstructionTask', {
    params,
  });
}

export function updateConstructionTask(params) {
  return request.post('api/constructionTask/updateConstructionTask', params);
}
