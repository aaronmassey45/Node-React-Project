import { combineReducers } from 'redux';

import appState from './appState';
import posts from './posts_reducer';

let rootReducer = combineReducers({
  appState,
  posts,
});

export default rootReducer;
