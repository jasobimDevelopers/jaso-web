import request from './request';

export function getQuantityList(params) {
  return request.get('api/quantity/getQuantityList', {
    params,
  });
}
