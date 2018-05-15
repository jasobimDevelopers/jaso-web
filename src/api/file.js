import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getFolderList(params) {
  return request.get('api/folder/getFolderList', {
    params,
  });
}

export function uploadFolders(params, cb) {
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

  return axios.post(`${apiRoot}/api/folder/uploadFolders`, formData, {
    ...config,
    onUploadProgress: (progressEvent) => {
      cb(progressEvent);
    },
  });
}

export function addFolder(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/folder/addFolder`, formData, config);
}

export function deleteFloder(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/floder/deleteFloder`, formData, config);
}

export function updateFloder(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/floder/updateFloder`, formData, config);
}
