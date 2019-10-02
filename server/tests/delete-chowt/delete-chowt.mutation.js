const deleteChowtMutation = `
  mutation DeleteChowt($id: ID!) {
    deleteChowt(id: $id) {
      id
    }
  }
`;

module.exports = deleteChowtMutation;
