import gql from 'graphql-tag';

export default gql`
  mutation UpdateUser(
    $bio: String!
    $currentPassword: String!
    $email: String!
    $location: String!
    $newPassword: String
    $profileImg: String!
    $username: String!
  ) {
    updateUser(
      bio: $bio
      currentPassword: $currentPassword
      email: $email
      location: $location
      newPassword: $newPassword
      profileImg: $profileImg
      username: $username
    ) {
      id
      bio
      email
      location
      profileImg
      username
    }
  }
`;
