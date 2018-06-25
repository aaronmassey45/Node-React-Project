import gql from 'graphql-tag';

export default gql`
  query CurrentUser($withLikedPosts: Boolean!) {
    me {
      id
      username
      likedPosts @include(if: $withLikedPosts) {
        id
      }
    }
  }
`;
