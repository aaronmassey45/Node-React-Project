import gql from 'graphql-tag';

export default gql`
  query fetchUser($id: ID, $username: String) {
    user(id: $id, username: $username) {
      bio
      followers {
        id
      }
      following {
        id
      }
      id
      isAFoodTruck
      likedPosts {
        _creator {
          id
          username
          profileImg
        }
        id
        likedBy {
          id
        }
        text
        timeCreated
      }
      location
      posts {
        id
        likedBy {
          id
        }
        text
        timeCreated
      }
      profileImg
      rating {
        average
        numberOfRatings
        totalRating
      }
      username
    }
  }
`;
