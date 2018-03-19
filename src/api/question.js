import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getQuestionList(params) {
  return request.get('api/question/admin/getQuestionList', {
    params,
  });
}

export function getQuestionListWithPercent(params) {
  return request.get('api/question/admin/getQuestionHash', {
    params,
  });
}

export function deleteQuestion(params) {
  return request.get('api/question/admin/deleteQuestionById', {
    params,
  });
}

export function getQuestionInfo(params) {
  return request.get('api/question/getQuestionDetails', {
    params,
  });
}

export function addQuestion(params) {
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

  return axios.post(`${apiRoot}/api/question/addQuestion`, formData, config);
}
