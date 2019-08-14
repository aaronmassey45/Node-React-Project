import gql from 'graphql-tag';

const CURRENT_USER = gql`
  query CurrentUser($withEditingData: Boolean = false) {
    me {
      id
      username
      profileImg
      following {
        id
      }
      ... on User @include(if: $withEditingData) {
        email
        location
        bio
        isAFoodTruck
      }
    }
  }
`;

export default CURRENT_USER;
