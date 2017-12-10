import { LOGIN_SUCCESS, AUTH_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from '../actions/userActions';

const INITIAL_STATE = {
  loggedIn: false,
  user: {
    _id: '',
    bio: '',
    location: '',
    username: ''
  }
};

const appState = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case AUTH_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: {
          ...state.user,
          _id: action.payload._id,
          bio: action.payload.bio,
          location: action.payload.location,
          username: action.payload.username
        }
      };
    case DELETE_USER_SUCCESS:
      return {
        loggedIn: false,
        user: {
          _id: '',
          bio: '',
          location: '',
          username: ''
        }
      };
    case LOGIN_FAILURE:
      throw new Error('Login failed');
    case SIGNUP_FAILURE:
      throw new Error('Could not sign you up');
    case DELETE_USER_FAILURE:
      throw new Error('Could not delete your account');
    default:
      return state;
  }
};

export default appState;
