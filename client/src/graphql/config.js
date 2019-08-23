import ApolloClient from 'apollo-boost';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

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

export default client;
