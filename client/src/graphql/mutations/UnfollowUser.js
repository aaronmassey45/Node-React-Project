import gql from 'graphql-tag';

export default gql`
  mutation UnfollowUser($id: ID!) {
    unfollowUser(id: $id)
  }
`;
