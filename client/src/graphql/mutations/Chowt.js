import gql from 'graphql-tag';

export default gql`
  mutation Chowt($location: Location, $text: String!) {
    chowt(text: $text, location: $location) {
      id
      text
      timeCreated
      likedBy {
        id
      }
      location {
        lat
        lng
      }
      _creator {
        username
        profileImg
        id
      }
    }
  }
`;
