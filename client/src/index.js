import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from '../src/store/store';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-rater/lib/react-rater.css';
import './App.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
