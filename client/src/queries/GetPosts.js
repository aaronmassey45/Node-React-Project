import gql from 'graphql-tag';

export default gql`
  {
    posts {
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
