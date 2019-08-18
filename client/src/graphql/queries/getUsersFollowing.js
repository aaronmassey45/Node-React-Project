import gql from 'graphql-tag';

const GET_USERS_FOLLOWING = gql`
  query getUsersFollowing($username: String!) {
    user(username: $username) {
      id
      following {
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

export default GET_USERS_FOLLOWING;
