import * as Actions from '../actions/actionTypes';

const INITIAL_STATE = {
  loggedIn: null,
  isFetching: null,
  user: {
    _id: '',
    bio: '',
    email: '',
    isAFoodTruck: false,
    likedPosts: [],
    location: '',
    profileImg: '',
    rating: '',
    username: '',
  },
  users: [],
};

const appState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
          likedPosts: action.payload.likedPosts,
          location: action.payload.location,
          profileImg: action.payload.profileImg,
          rating: action.payload.rating,
          username: action.payload.username,
        },
      };
    case Actions.DELETE_USER_SUCCESS:
      return INITIAL_STATE;
    case Actions.LOGIN_FAILURE:
    case Actions.AUTH_FAILURE:
    case Actions.SIGNUP_FAILURE:
      return { ...state, loggedIn: false, isFetching: false };
    case Actions.DELETE_USER_FAILURE:
    case Actions.UPDATE_FAILURE:
    case Actions.FETCH_USER_FAILURE:
      return { ...state, isFetching: false };
    case Actions.FETCH_USER_SUCCESS:
      return { ...state, isFetching: false, users: action.payload };
    case Actions.POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: { ...state.user, likedPosts: [...action.payload.likedPosts] },
      };
    case Actions.LOGOUT_SUCCESS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

export default appState;
