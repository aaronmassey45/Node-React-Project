import gql from 'graphql-tag';

const VERIFY_USER_ACCOUNT = gql`
  query verifyUserAccount($username: String!, $token: String!) {
    verifyUserAccount(username: $username, token: $token)
  }
`;

export default VERIFY_USER_ACCOUNT;
