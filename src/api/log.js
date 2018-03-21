import axios from 'axios';
import { getToken } from '@/utils/auth';
import request, { apiRoot, config } from './request';

export function getUserLogList(params) {
  return request.get('api/userLog/admin/getUserLogList', {
    params,
  });
}

export function deleteUserLog(params) {
  return request.get('api/userLog/admin/deleteUserLog', {
    params,
  });
}

export function exportUserLog(params) {
  return request.get('api/userLog/admin/exportUserLog', {
    params,
  });
}

export function getUserLogCountSum(params) {
  return request.get('api/userLog/getUserLogCountSum', {
    params,
  });
}
