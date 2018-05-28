import * as Actions from '../actions/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case Actions.FOUND_USER_SUCCESS:
      return { ...state, ...action.payload };
    case Actions.FOUND_USER_FAILURE:
      return { error: action.payload };
    case Actions.CLEAR_FOUND_USER:
    default:
      return null;
  }
};
