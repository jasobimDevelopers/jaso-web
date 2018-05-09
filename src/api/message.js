import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getMessageListByQuestion(params) {
  return request.get('api/message/getMessageListByQuestionId', {
    params,
  });
}

export function deleteMessage(params) {
  return request.get('api/message/deleteMessage', {
    params,
  });
}

export function updateMessage(params) {
  return request.post('api/message/admin/updateMessage', params);
}

export function addMessage(params) {
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

  return axios.post(`${apiRoot}/api/message/admin/addMessage`, formData, config);
}

export function getMessageListByQualityId(params) {
  return request.get('api/message/getMessageListByQualityId', {
    params,
  });
}

export function getMessageListByQuestionId(params) {
  return request.get('api/message/getMessageListByQuestionId', {
    params,
  });
}
