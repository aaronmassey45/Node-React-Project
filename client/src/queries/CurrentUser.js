import gql from 'graphql-tag';

export default gql`
  {
    me {
      id
      username
    }
  }
`;
