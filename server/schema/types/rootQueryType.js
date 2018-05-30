const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const UserType = require('./userType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
