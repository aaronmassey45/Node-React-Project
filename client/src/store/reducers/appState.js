import * as Actions from '../actions/actionTypes';

const INITIAL_STATE = {
  loggedIn: false,
  user: {
    _id: '',
    bio: '',
    email: '',
    isAFoodTruck: false,
    location: '',
    profileImg: '',
    rating: '',
    username: ''
  }
};

const appState = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case Actions.LOGIN_SUCCESS:
    case Actions.SIGNUP_SUCCESS:
    case Actions.AUTH_SUCCESS:
    case Actions.UPDATE_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: {
          ...state.user,
          _id: action.payload._id,
          bio: action.payload.bio,
          email: action.payload.email,
          isAFoodTruck: action.payload.isAFoodTruck,
          location: action.payload.location,
          profileImg: action.payload.profileImg,
          rating: action.payload.rating,
          username: action.payload.username
        }
      };
    case Actions.DELETE_USER_SUCCESS:
      return {
        loggedIn: false,
        user: {
          _id: '',
          bio: '',
          email: '',
          isAFoodTruck: false,
          location: '',
          profileImg: '',
          rating: '',
          username: ''
        }
      };
    case Actions.LOGIN_FAILURE:
      throw new Error('Login failed');
    case Actions.SIGNUP_FAILURE:
      throw new Error('Could not sign you up');
    case Actions.DELETE_USER_FAILURE:
      throw new Error('Could not delete your account');
    case Actions.UPDATE_FAILURE:
      throw new Error('Could not update your account');
    default:
      return state;
  }
};

export default appState;
