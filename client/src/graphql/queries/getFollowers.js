import gql from 'graphql-tag';

const GET_FOLLOWERS = gql`
  query getFollowers($getUsersFollowing: Boolean = false) {
    getFollowers(getUsersFollowing: $getUsersFollowing) {
      id
      username
      bio
      profileImg
    }
  }
`;

export default GET_FOLLOWERS;
