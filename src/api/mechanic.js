import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getMechanicList(params) {
  return request.get('api/mechanic/getMechanicList', {
    params,
  });
}

export function addMechanic(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/mechanic/addMechanic`, formData, config);
}

export function updateMechanic(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      if (params[key] != null) {
        formData.append(key, params[key]);
      }
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/mechanic/updateMechanic`, formData, config);
}

export function deleteMechanic(params) {
  return request.get('api/mechanic/deleteMechanic', {
    params,
  });
}
