import request from './request';

export function getMenuListList() {
  return request.get('api/menu/admin/getMenuListList');
}

