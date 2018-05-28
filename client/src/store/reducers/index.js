import { combineReducers } from 'redux';

import appState from './appState';
import foundUser from './foundUser';
import loading from './loading';
import posts from './posts_reducer';

const rootReducer = combineReducers({
  appState,
  foundUser,
  loading,
  posts,
});

export default rootReducer;
