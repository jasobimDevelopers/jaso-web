import request from './request';

export function getPaperList(params) {
  return request.get('api/paper/admin/getPaperLists', {
    params,
  });
}

export function deletePaper(params) {
  return request.get('api/paper/admin/deletePaper', {
    params,
  });
}
