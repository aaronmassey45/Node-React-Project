const populateFeedQuery = `
  query PopulateFeed($offset: Int) {
    populateFeed(offset: $offset) {
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

module.exports = populateFeedQuery;
