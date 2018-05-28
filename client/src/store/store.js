import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';

import rootReducer from './reducers';

const middlewares = [apiMiddleware];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export default createStore(rootReducer, {}, applyMiddleware(...middlewares));
