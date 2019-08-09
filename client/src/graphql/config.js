import ApolloClient, { InMemoryCache } from 'apollo-boost';

const cache = new InMemoryCache();

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
