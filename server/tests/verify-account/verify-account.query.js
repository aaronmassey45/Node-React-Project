const verifyUserAccountQuery = `
  query verifyUserAccount($username: String!, $token: String!) {
    verifyUserAccount(username: $username, token: $token)
  }
`;

module.exports = verifyUserAccountQuery;
