import gql from 'graphql-tag';

export default gql`
  mutation Signup(
    $username: String!
    $email: String!
    $password: String!
    $isAFoodTruck: Boolean!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
      isAFoodTruck: $isAFoodTruck
    )
  }
`;
