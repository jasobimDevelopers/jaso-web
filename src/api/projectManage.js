import request from './request';

export function getProjectList(params) {
  return request.get('api/project/admin/getProjectList', {
    params,
  });
}

export function addProject(params) {
  return request.post('api/project/admin/addProject', params);
}

export function updateProject(params) {
  return request.post('api/project/admin/updateProject', params);
}

export function deleteProject(params) {
  return request.get('api/project/admin/deleteProject', {
    params,
  });
}
