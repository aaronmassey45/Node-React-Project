const unfollowUserMutation = `
  mutation UnfollowUser($id: ID!) {
    unfollowUser(id: $id)
  }
`;

module.exports = unfollowUserMutation;
