import { CALL_API } from 'redux-api-middleware';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILURE = 'POST_FAILURE';

export function modifyPost(id, method) {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      types: [POST_REQUEST, POST_SUCCESS, POST_FAILURE],
      endpoint: `/post/${id}`,
      method,
      headers: { 'x-auth': token }
    }
  };
}
