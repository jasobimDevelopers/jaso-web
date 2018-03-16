import request from './request';

export function getVideoList(params) {
  return request.get('api/video/admin/getVideoList', {
    params,
  });
}

export function deleteVideo(params) {
  return request.get('api/video/admin/deleteVideo', {
    params,
  });
}
