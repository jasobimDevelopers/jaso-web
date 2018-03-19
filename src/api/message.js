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
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/message/admin/addMessage`, formData, config);
}
