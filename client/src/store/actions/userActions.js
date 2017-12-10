import { CALL_API } from 'redux-api-middleware';

export const REQUEST = 'REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export function login(credentials) {
  return {
    [CALL_API]: {
      types: [
        REQUEST,
        {
          type: LOGIN_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              setAuthToken(res)
            }
          },
        },
        LOGIN_FAILURE
      ],
      endpoint: '/user/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }
  };
}

export function isUserAuthenticated() {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      types: [REQUEST, AUTH_SUCCESS, AUTH_FAILURE],
      endpoint: '/users/me',
      method: 'GET',
      headers: { 'x-auth': token }
    }
  }
}

export function signup(credentials) {
  return {
    [CALL_API]: {
      types: [
        REQUEST,
        {
          type: SIGNUP_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              setAuthToken(res)
            }
          },
        },
        SIGNUP_FAILURE
      ],
      endpoint: '/signup/newuser',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }
  };
}

export function deleteUser() {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      types: [
        REQUEST,
        {
          type: DELETE_USER_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              localStorage.removeItem('x-auth');
            }
          },
        },
        DELETE_USER_FAILURE
      ],
      endpoint: '/users/me',
      method: 'DELETE',
      headers: { 'x-auth': token },
    }
  }
}

function setAuthToken(response) {
  const token = response.headers.get('x-auth');
  localStorage.setItem('x-auth', token);
}