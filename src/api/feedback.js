import request from './request';

export function getFeedbackList(params) {
  return request.get('api/feedback/admin/getFeedbackList', {
    params,
  });
}

export function deleteFeedback(params) {
  return request.get('api/feedback/admin/deleteFeedback', {
    params,
  });
}
