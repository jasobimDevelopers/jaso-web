import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getVideoList(params) {
  return request.get('api/video/admin/getVideoList', {
    params,
  });
}

export function addVideo(params) {
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

  return axios.post(`${apiRoot}/api/video/admin/addVideo`, formData, config);
}

export function deleteVideo(params) {
  return request.get('api/video/admin/deleteVideo', {
    params,
  });
}
