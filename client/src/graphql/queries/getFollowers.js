import gql from 'graphql-tag';

const GET_FOLLOWERS = gql`
  query getFollowers($getUsersFollowing: Boolean = false, $username: String!) {
    getFollowers(getUsersFollowing: $getUsersFollowing, username: $username) {
      id
      username
      bio
      profileImg
    }
  }
`;

export default GET_FOLLOWERS;
