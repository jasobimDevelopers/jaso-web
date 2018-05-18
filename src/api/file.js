import axios from 'axios';
import querystring from 'querystring';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getFolderIndexList(params) {
  return request.get('api/folder/getFolderIndexList', {
    params,
  });
}

export function getFolderList(params) {
  return request.get('api/folder/getFolderList', {
    params,
  });
}

export function findFileLists(params) {
  return request.get('api/folder/findFileLists', {
    params,
  });
}

export function batchDownload(params) {
  params.token = getToken();
  const ps = querystring.stringify(params);
  window.open(`${apiRoot}/api/folder/batchDownload?${ps}`, '_blank');
  // request.get('api/folder/batchDownload', {
  //   params,
  // });
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

export function deleteFolder(params) {
  return request.get('api/folder/deleteFolder', {
    params,
  });
}

export function updateFolder(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/folder/updateFolder`, formData, config);
}

export function takeFolderTo(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/folder/takeFolderTo`, formData, config);
}
