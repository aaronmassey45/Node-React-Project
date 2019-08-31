const currentUserQuery = `
  query CurrentUser($withEditingData: Boolean = false) {
    me {
      id
      username
      ... on User @include(if: $withEditingData) {
        email
      }
    }
}`;

module.exports = currentUserQuery;
