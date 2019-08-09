import gql from 'graphql-tag';

const GET_USERS_FOLLOWERS = gql`
  query updateFollowingDetails($id: ID!) {
    me {
      id
      following {
        id
      }
    }

    user(id: $id) {
      id
      followers {
        id
      }
    }
  }
`;

export default GET_USERS_FOLLOWERS;
