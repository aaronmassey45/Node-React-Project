const searchQuery = `
  query search($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      __typename
      ... on User {
        id
        username
      }

      ... on Post {
        id
        text
      }
    }
  }
`;

module.exports = searchQuery;
