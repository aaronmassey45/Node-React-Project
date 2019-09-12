const followUserMutation = `
  mutation FollowUser($id: ID!) {
    followUser(id: $id)
  }
`;

module.exports = followUserMutation;
