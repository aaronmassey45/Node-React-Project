import gql from 'graphql-tag';

export default gql`
  mutation LikeChowt($id: ID!) {
    likeChowt(id: $id) {
      id
      text
      likedBy {
        username
      }
    }
  }
`;
