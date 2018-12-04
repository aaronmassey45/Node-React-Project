import gql from 'graphql-tag';

export default gql`
  mutation DeleteChowt($id: ID!) {
    deleteChowt(id: $id) {
      id
    }
  }
`;
