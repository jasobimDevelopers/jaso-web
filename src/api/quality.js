import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getQualityHash(params) {
  return request.get('api/quality/admin/getQualityHash', {
    params,
  });
}

export function addQuality(params) {
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

  return axios.post(`${apiRoot}/api/quality/addQuality`, formData, config);
}

export function getQualityFineList(params) {
  return request.get('api/qualityFine/getQualityFineList', {
    params,
  });
}

export function addQualityFine(params) {
  const formData = new FormData();

  for (const key in params) {
    // file list
    if (key === 'fileList') {
      Array.from(params[key]).forEach((file) => {
        formData.append('files', file);
      });
    } else {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/qualityFine/addQualityFine`, formData, config);
}

export function updateQualityState(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/quality/updateQualityState`, formData, config);
}
