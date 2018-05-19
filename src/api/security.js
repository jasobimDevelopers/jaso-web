import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getQuestionHash(params) {
  return request.get('api/question/admin/getQuestionHash', {
    params,
  });
}

export function addQuestion(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      // file list
      if (key === 'file') {
        Array.from(params[key]).forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, params[key]);
      }
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/question/addQuestion`, formData, config);
}

export function getSafeFineList(params) {
  return request.get('api/safeFine/getSafeFineList', {
    params,
  });
}

export function addSafeFine(params) {
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

  return axios.post(`${apiRoot}/api/safeFine/addSafeFine`, formData, config);
}

export function updateQuestionState(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/question/updateQuestionState`, formData, config);
}
