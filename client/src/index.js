import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';
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
  request: context => {
    const token = localStorage.getItem('x-auth');
    context.setContext({
      headers: {
        'x-auth': token,
      },
    });
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
