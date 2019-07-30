import gql from 'graphql-tag';

const CURRENT_USER = gql`
  query CurrentUser(
    $withLikedPosts: Boolean = false
    $withEditingData: Boolean = false
  ) {
    me {
      id
      username
      profileImg
      likedPosts @include(if: $withLikedPosts) {
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
