import { LOGIN_SUCCESS, AUTH_SUCCESS, LOGIN_FAILURE } from '../actions/loginActions';

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
    default:
      return state;
  }
};

export default appState;
