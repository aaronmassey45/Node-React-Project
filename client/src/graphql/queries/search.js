import gql from 'graphql-tag';

const SEARCH = gql`
  query search($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      __typename
      ... on User {
        id
        bio
        followers {
          id
        }
        profileImg
        username
      }

      ... on Post {
        id
        likedBy {
          id
        }
        location {
          lat
          lng
        }
        timeCreated
        text
        _creator {
          id
          username
          profileImg
        }
      }
    }
  }
`;

export default SEARCH;
