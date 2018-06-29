const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Post = mongoose.model('post');
const UserType = require('./types/userType');
const PostType = require('./types/postType');

const AuthService = require('../services/auth');
const PostService = require('../services/post');

const Location = new GraphQLInputObjectType({
  name: 'Location',
  fields: () => ({
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
  }),
});

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: GraphQLString,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, { password, username }) {
        return AuthService.login({ password, username });
      },
    },
    logout: {
      type: UserType,
      resolve(_, args, { user, token }) {
        return AuthService.logout(user, token);
      },
    },
    chowt: {
      type: PostType,
      args: {
        location: { type: Location },
        text: { type: GraphQLString },
      },
      resolve(_, { text, location }, { user }) {
        return PostService.chowt(text, location, user);
      },
    },
    likeChowt: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(_, { id }, { user }) {
        return PostService.likeChowt(id, user);
      },
    },
    deleteChowt: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(_, { id }, { user }) {
        return PostService.deleteChowt(id, user);
      },
    },
    signup: {
      type: GraphQLString,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        isAFoodTruck: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(_, args) {
        return AuthService.signup({ ...args });
      },
    },
    deleteUser: {
      type: GraphQLID,
      resolve(_, args, { user }) {
        return AuthService.deleteUser(user);
      },
    },
  },
});

module.exports = mutations;
