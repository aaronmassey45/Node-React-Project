const graphql = require('graphql');
const mongoose = require('mongoose');

const UserType = require('./userType');
const PostType = require('./postType');

const User = mongoose.model('user');
const Post = mongoose.model('post');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    me: {
      type: UserType,
      resolve(_, args, context) {
        return context.user;
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
      },
      resolve(_, { id, username }) {
        if (!id && !username) return null;
        return User.findOne({ $or: [{ _id: id }, { username }] });
      },
    },
    populateFeed: {
      type: new GraphQLList(PostType),
      args: { offset: { type: GraphQLInt, defaultValue: 0 } },
      resolve(_, { offset }, { user }) {
        return Post.find(
          { _creator: { $in: [...user.following, user.id] } },
          null,
          {
            skip: offset,
          }
        )
          .sort({ $natural: -1 })
          .limit(25);
      },
    },
  }),
});

module.exports = RootQuery;
