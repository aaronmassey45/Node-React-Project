import { CALL_API } from 'redux-api-middleware';

import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAILURE,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from './actionTypes';

export const modifyPost = (id, method) => {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      types: [POST_REQUEST, POST_SUCCESS, POST_FAILURE],
      endpoint: `/api/post/${id}`,
      method,
      headers: { 'x-auth': token },
    },
  };
};

export const fetchPosts = () => {
  return {
    [CALL_API]: {
      types: [POST_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE],
      endpoint: '/api/posts',
      method: 'GET',
    },
  };
};
