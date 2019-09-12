const rateUserMutation = `
  mutation RateAccount($id: ID!, $rating: Int!) {
    rateAccount(id: $id, rating: $rating) {
      id
      rating {
        average
      }
    }
  }
`;

module.exports = rateUserMutation;
