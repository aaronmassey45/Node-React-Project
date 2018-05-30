const graphql = require('graphql');

const RootQuery = require('./types/rootQueryType');

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
