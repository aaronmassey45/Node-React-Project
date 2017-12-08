import { CALL_API } from 'redux-api-middleware';

export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAILURE = 'LIKE_FAILURE';

export function likePost(id) {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      types: [LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE],
      endpoint: `/post/${id}`,
      method: 'PATCH',
      headers: { 'x-auth': token }
    }
  };
}
