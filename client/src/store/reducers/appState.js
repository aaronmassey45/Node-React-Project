import * as Actions from '../actions/actionTypes';

const INITIAL_STATE = {
  loggedIn: false,
  isFetching: false,
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

const appState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case Actions.LOGIN_SUCCESS:
    case Actions.SIGNUP_SUCCESS:
    case Actions.AUTH_SUCCESS:
    case Actions.UPDATE_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        isFetching: false,
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
        isFetching: false,
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
    case Actions.AUTH_FAILURE:
    case Actions.SIGNUP_FAILURE:
      return { ...state, loggedIn: false, isFetching: false };
    case Actions.DELETE_USER_FAILURE:
      throw new Error('Could not delete your account');
    case Actions.UPDATE_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default appState;
