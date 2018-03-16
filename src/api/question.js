import request from './request';

export function getQuestionList(params) {
  return request.get('api/question/admin/getQuestionList', {
    params,
  });
}

export function deleteQuestion(params) {
  return request.get('api/question/admin/deleteQuestion', {
    params,
  });
}
