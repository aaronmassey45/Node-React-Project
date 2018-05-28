import { CALL_API } from 'redux-api-middleware';

import * as Actions from './actionTypes';

export const modifyPost = (id, method) => {
  const token = localStorage.getItem('x-auth');
  const success =
    method === 'DELETE' ? Actions.DELETE_POST_SUCCESS : Actions.POST_SUCCESS;
  const failure =
    method === 'DELETE' ? Actions.DELETE_POST_FAILURE : Actions.POST_FAILURE;

  return {
    [CALL_API]: {
      types: [Actions.POST_REQUEST, success, failure],
      endpoint: `/api/post/${id}`,
      method,
      headers: { 'x-auth': token },
    },
  };
};

export const fetchPosts = () => {
  return {
    [CALL_API]: {
      types: [
        Actions.POST_REQUEST,
        Actions.FETCH_POSTS_SUCCESS,
        Actions.FETCH_POSTS_FAILURE,
      ],
      endpoint: '/api/posts',
      method: 'GET',
    },
  };
};
