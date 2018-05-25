import request from './request';

export function getModelViewToken(params) {
  return request.get('http://jasobim.com.cn/iot/api/bimface/getModelViewToken', {
    params,
  });
}
