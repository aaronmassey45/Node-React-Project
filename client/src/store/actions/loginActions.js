import { CALL_API } from 'redux-api-middleware';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login(credentials) {
  return {
    [CALL_API]: {
      types: [
        LOGIN_REQUEST,
        {
          type: LOGIN_SUCCESS,
          meta: (action, state, res) => {
            if (res) {
              const token = res.headers.get('x-auth');
              localStorage.setItem('x-auth', token);
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
