import gql from 'graphql-tag';

export default gql`
  mutation RateAccount($id: ID!, $rating: Int!) {
    rateAccount(id: $id, rating: $rating) {
      id
      rating {
        average
      }
    }
  }
`;
