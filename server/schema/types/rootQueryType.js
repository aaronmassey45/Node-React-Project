const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLList } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Post = mongoose.model('post');
const UserType = require('./userType');
const PostType = require('./postType');

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
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue) {
        return Post.find({});
      },
    },
  }),
});

module.exports = RootQuery;
