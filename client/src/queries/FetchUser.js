import gql from 'graphql-tag';

export default gql`
  query fetchUser($id: ID, $username: String) {
    user(id: $id, username: $username) {
      id
      bio
      isAFoodTruck
      location
      profileImg
      rating {
        average
        numberOfRatings
        totalRating
      }
      username
      posts {
        id
        text
        timeCreated
        likedBy {
          id
        }
      }
    }
  }
`;
