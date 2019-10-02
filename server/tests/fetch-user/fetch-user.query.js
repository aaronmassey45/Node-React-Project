const fetchUserQuery = `
  query fetchUser($id: ID, $username: String) {
    user(id: $id, username: $username) {
      id
      username
    }
  }
`;

module.exports = fetchUserQuery;
