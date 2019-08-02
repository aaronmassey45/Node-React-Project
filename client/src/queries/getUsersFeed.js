import gql from 'graphql-tag';

const GET_USERS_FEED = gql`
  query PopulateFeed($skip: Int) {
    populateFeed(skip: $skip) {
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
        id
        username
        profileImg
      }
    }
  }
`;

export default GET_USERS_FEED;
