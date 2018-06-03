import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from '../src/store/store';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-rater/lib/react-rater.css';
import './App.css';

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
});

const client = new ApolloClient({
  cache,
  credentials: 'same-origin',
  uri: '/api',
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
