import { CALL_API } from 'redux-api-middleware';

export const REQUEST = 'REQUEST';
export const FAILURE = 'FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export function login(credentials) {
  return {
    [CALL_API]: {
      types: [
        REQUEST,
        {
          type: LOGIN_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              const token = res.headers.get('x-auth');
              localStorage.setItem('x-auth', token);
            }
          },
        },
        FAILURE
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
      types: [REQUEST, AUTH_SUCCESS, FAILURE],
      endpoint: '/authenticated',
      method: 'GET',
      headers: { 'x-auth': token }
    }
  }
}
