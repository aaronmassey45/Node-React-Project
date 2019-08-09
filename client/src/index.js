import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import client from './graphql/config';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-rater/lib/react-rater.css';
import './App.scss';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
