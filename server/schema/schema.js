const graphql = require('graphql');

const RootQuery = require('./types/rootQueryType');
const mutations = require('./mutations');

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});
