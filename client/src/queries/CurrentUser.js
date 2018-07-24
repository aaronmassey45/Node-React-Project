import gql from 'graphql-tag';

export default gql`
  query CurrentUser(
    $withLikedPosts: Boolean = false
    $withEditingData: Boolean = false
  ) {
    me {
      id
      username
      likedPosts @include(if: $withLikedPosts) {
        id
      }
      ... on User @include(if: $withEditingData) {
        email
        location
        profileImg
        bio
        isAFoodTruck
      }
    }
  }
`;
