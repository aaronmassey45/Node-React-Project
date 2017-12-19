import { CALL_API } from 'redux-api-middleware';
import * as Actions from './actionTypes';

export function login(credentials) {
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
          }
        },
        Actions.LOGIN_FAILURE
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
      types: [Actions.REQUEST, Actions.AUTH_SUCCESS, Actions.AUTH_FAILURE],
      endpoint: '/users/me',
      method: 'GET',
      headers: { 'x-auth': token }
    }
  };
}

export function signup(credentials) {
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
          }
        },
        Actions.SIGNUP_FAILURE
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
        Actions.REQUEST,
        {
          type: Actions.DELETE_USER_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              localStorage.removeItem('x-auth');
            }
          }
        },
        Actions.DELETE_USER_FAILURE
      ],
      endpoint: '/users/me',
      method: 'DELETE',
      headers: { 'x-auth': token }
    }
  };
}

export function updateUser(body) {
  const token = localStorage.getItem('x-auth');
  return {
    [CALL_API]: {
      types: [Actions.REQUEST, Actions.UPDATE_SUCCESS, Actions.UPDATE_FAILURE],
      endpoint: '/users/me',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-auth': token },
      body: JSON.stringify(body)
    }
  };
}

function setAuthToken(response) {
  const token = response.headers.get('x-auth');
  localStorage.setItem('x-auth', token);
}
