import { CALL_API } from 'redux-api-middleware';
import * as Actions from './actionTypes';

export const getUser = username => {
  return {
    [CALL_API]: {
      endpoint: `/api/users/account/${username}`,
      types: [
        Actions.REQUEST,
        Actions.FOUND_USER_SUCCESS,
        Actions.FOUND_USER_FAILURE,
      ],
      method: 'GET',
    },
  };
};

export const clearFoundUser = () => {
  return { type: Actions.CLEAR_FOUND_USER };
};
