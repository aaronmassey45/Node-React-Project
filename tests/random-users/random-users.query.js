const getRandomUsersQuery = `
  query RandomUsers($sampleSize: Int) {
    randomUsers(sampleSize: $sampleSize) {
      id
      bio
      profileImg
      username
    }
  }
`;

module.exports = getRandomUsersQuery;
