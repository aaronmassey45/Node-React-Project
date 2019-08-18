import gql from 'graphql-tag';

const GET_USERS_FOLLOWERS = gql`
  query getUsersFollowers($username: String!) {
    user(username: $username) {
      id
      followers {
        id
        username
        profileImg
        bio
        followers {
          id
        }
      }
    }
  }
`;

export default GET_USERS_FOLLOWERS;
