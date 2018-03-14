import axios from 'axios';
import request from './request';
import { getToken } from '@/utils/auth';

const config = {
  headers: {'Content-Type': 'multipart/form-data'}
};

export function getUserList(params) {
  return request.get('api/user/admin/getUserList', {
    params,
  });
}

export function getUserTeam(params) {
  return request.get('api/user/getUserTeam', {
    params,
  });
}

export function getUser(params) {
  return request.get('api/user/admin/getUserDetails', {
    params,
  });
}

export function addUser(params) {
  const formData = new FormData();

  for(var key in params){
    if(params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post('apis/api/user/admin/addUser', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function updateUser(params) {
  const formData = new FormData();

  for(var key in params){
    if(params[key] != null) {
      formData.append(key, params[key]);
    }
  }

  formData.append('token', getToken());

  return axios.post('apis/api/user/admin/updateUser', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function deleteUser(params) {
  return request.get('api/user/admin/deleteUser', {
    params,
  });
}
