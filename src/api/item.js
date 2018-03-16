import request from './request';

export function getItemList(params) {
  return request.get('api/item/admin/getItemList', {
    params,
  });
}
