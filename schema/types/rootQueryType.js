const graphql = require('graphql');
const mongoose = require('mongoose');

const UserType = require('./userType');
const PostType = require('./postType');
const UserService = require('../../services/user');

const User = mongoose.model('user');
const Post = mongoose.model('post');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
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
    getFollowers: {
      type: new GraphQLList(UserType),
      args: {
        getUsersFollowing: { type: GraphQLBoolean },
        username: { type: GraphQLString },
      },
      async resolve(_, { getUsersFollowing, username }) {
        try {
          if (!username) throw Error('You must enter a user name');
          const user = await User.findOne({ username });

          if (getUsersFollowing) {
            return User.find({ _id: { $in: user.following } });
          }

          return User.find({ _id: { $in: user.followers } });
        } catch (err) {
          return err;
        }
      },
    },
    randomUsers: {
      type: new GraphQLList(UserType),
      args: { sampleSize: { type: GraphQLInt, defaultValue: 4 } },
      resolve(_, { sampleSize }, { user }) {
        return User.aggregate([{ $sample: { size: sampleSize } }]).then(users =>
          users
            .map(randomUser => {
              randomUser.id = randomUser._id;
              return randomUser;
            })
            .filter(randomUser => randomUser._id != user.id)
            .splice(0, sampleSize - 1)
        );
      },
    },
    verifyUserAccount: {
      type: GraphQLString,
      args: {
        username: { type: GraphQLString },
        token: { type: GraphQLString },
      },
      resolve(_, { username, token }) {
        if (!username || !token) {
          throw new Error('Missing verification information.');
        }
        return UserService.verifyUserAccount(username, token);
      },
    },
  }),
});

module.exports = RootQuery;
