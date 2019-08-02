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
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({});
      },
    },
    populateFeed: {
      type: new GraphQLList(PostType),
      args: { skip: { type: GraphQLInt, defaultValue: 0 } },
      resolve(_, { skip }, { user }) {
        return Post.find(
          { _creator: { $in: [...user.following, user.id] } },
          null,
          {
            skip,
          }
        ).limit(25);
      },
    },
  }),
});

module.exports = RootQuery;
