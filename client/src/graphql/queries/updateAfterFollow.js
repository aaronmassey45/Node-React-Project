import gql from 'graphql-tag';

const UPDATE_AFTER_FOLLOW = gql`
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

export default UPDATE_AFTER_FOLLOW;
