import { CALL_API } from 'redux-api-middleware';
import * as Actions from './actionTypes';

export const fetchUsers = () => {
  return {
    [CALL_API]: {
      endpoint: '/api/userlist',
      types: [
        Actions.REQUEST,
        Actions.FETCH_USER_SUCCESS,
        Actions.FETCH_USER_FAILURE,
      ],
      method: 'GET',
    },
  };
};

export const login = credentials => {
  return {
    [CALL_API]: {
      types: [
        Actions.REQUEST,
        {
          type: Actions.LOGIN_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              setAuthToken(res);
            }
          },
        },
        Actions.LOGIN_FAILURE,
      ],
      endpoint: '/api/user/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    },
  };
};

export const isUserAuthenticated = () => {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      types: [Actions.REQUEST, Actions.AUTH_SUCCESS, Actions.AUTH_FAILURE],
      endpoint: '/api/users/me',
      method: 'GET',
      headers: { 'x-auth': token },
    },
  };
};

export const signup = credentials => {
  return {
    [CALL_API]: {
      types: [
        Actions.REQUEST,
        {
          type: Actions.SIGNUP_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              setAuthToken(res);
            }
          },
        },
        Actions.SIGNUP_FAILURE,
      ],
      endpoint: '/api/signup/newuser',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    },
  };
};

export const deleteUser = () => {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      types: [
        Actions.REQUEST,
        {
          type: Actions.DELETE_USER_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              localStorage.removeItem('x-auth');
            }
          },
        },
        Actions.DELETE_USER_FAILURE,
      ],
      endpoint: '/api/users/me',
      method: 'DELETE',
      headers: { 'x-auth': token },
    },
  };
};

export const updateUser = body => {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      types: [Actions.REQUEST, Actions.UPDATE_SUCCESS, Actions.UPDATE_FAILURE],
      endpoint: '/api/users/me',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-auth': token },
      body: JSON.stringify(body),
    },
  };
};

export const logout = history => {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      endpoint: '/api/logout',
      headers: { 'x-auth': token },
      method: 'DELETE',
      types: [
        Actions.REQUEST,
        {
          type: Actions.LOGOUT_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              localStorage.removeItem('x-auth');
              history.push('/');
            }
          },
        },
        Actions.LOGOUT_FAILURE,
      ],
    },
  };
};

const setAuthToken = response => {
  const token = response.headers.get('x-auth');
  localStorage.setItem('x-auth', token);
};
