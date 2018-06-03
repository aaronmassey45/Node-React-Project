import gql from 'graphql-tag';

export const opts = {
  options: {
    context: {
      headers: {
        'x-auth': localStorage.getItem('x-auth'),
      },
    },
  },
};

export const query = gql`
  {
    me {
      id
      username
    }
  }
`;
