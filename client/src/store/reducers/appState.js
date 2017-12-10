import { LOGIN_SUCCESS, AUTH_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/userActions';

const INITIAL_STATE = {
  loggedIn: false,
  user: {
    username: '',
    _id: ''
  }
};

const appState = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        "user.username": action.payload.username,
        "user._id": action.payload._id
       };
    case AUTH_SUCCESS:
      return {
        ...state,
        loggedIn: true
      }
    case LOGIN_FAILURE:
      throw new Error('Login failed');
    case SIGNUP_FAILURE:
      throw new Error('Could not sign you up');
    default:
      return state;
  }
};

export default appState;
