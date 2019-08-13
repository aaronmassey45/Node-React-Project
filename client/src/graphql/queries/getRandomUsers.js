import gql from 'graphql-tag';

const GET_RANDOM_USERS = gql`
  query RandomUsers($sampleSize: Int) {
    randomUsers(sampleSize: $sampleSize) {
      id
      bio
      profileImg
      username
    }
  }
`;

export default GET_RANDOM_USERS;
