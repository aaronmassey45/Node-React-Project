const getFollowersQuery = `
  query getFollowers($getUsersFollowing: Boolean = false, $username: String!) {
    getFollowers(getUsersFollowing: $getUsersFollowing, username: $username) {
      id
    }
  }
`;

module.exports = getFollowersQuery;
