import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getBudgetList(params) {
  return request.get('api/budget/vs/getBudgetList', {
    params,
  });
}

export function importBudget(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/budget/web/importBudget`, formData, config);
}
