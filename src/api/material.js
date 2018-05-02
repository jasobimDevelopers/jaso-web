import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getMaterialTypeList(params) {
  return request.get('api/materialType/vs/getMaterialTypeList', {
    params,
  });
}

export function addMaterialType(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/materialType/vs/addMaterialType`, formData, config);
}

export function updateMaterialType(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/materialType/self/updateMaterialType`, formData, config);
}

export function deleteMaterialType(params) {
  return request.get('api/materialType/admin/deleteMaterialType', {
    params,
  });
}

export function getMaterialLogList(params) {
  return request.get('api/materialLog/vs/getMaterialLogList', {
    params,
  });
}

export function getMaterialList(params) {
  return request.get('api/material/vs/getMaterialList', {
    params,
  });
}

export function addMaterial(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/material/vs/addMaterial`, formData, config);
}

export function updateMaterial(params) {
  const formData = new FormData();

  for (const key in params) {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post(`${apiRoot}/api/material/updateMaterial`, formData, config);
}
