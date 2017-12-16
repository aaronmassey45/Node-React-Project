import { FETCH_POSTS_SUCCESS } from '../actions/actionTypes';

const posts = (state=[], action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default posts;
