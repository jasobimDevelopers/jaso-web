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
