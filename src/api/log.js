import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getUserLogList(params) {
  return request.get('api/userLog/admin/getUserLogList', {
    params,
  });
}

export function deleteUserLog(params) {
  return request.get('api/userLog/admin/deleteUserLog', {
    params,
  });
}

export function exportUserLog(params) {
  return request.get('api/userLog/admin/exportUserLog', {
    params,
  });
}

export function getUserLogCountSum(params) {
  return request.get('api/userLog/getUserLogCountSum', {
    params,
  });
}

export function getConstructionLogList(params) {
  return request.get('api/constructionLog/web/getConstructionLogList', {
    params,
  });
}

export function deleteConstructionLog(params) {
  return request.get('api/constructionLog/deleteConstructionLog', {
    params,
  });
}

export function addConstructionLog(params) {
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

  return axios.post(`${apiRoot}/api/constructionLog/web/addConstructionLog`, formData, config);
}

export function updateConstructionLog(params) {
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

  return axios.post(`${apiRoot}/api/constructionLog/updateConstructionLog`, formData, config);
}
