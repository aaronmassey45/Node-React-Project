const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Post = mongoose.model('post');
const UserType = require('./types/userType');
const PostType = require('./types/postType');

const AuthService = require('../services/auth');

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: GraphQLString,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { password, username }) {
        return AuthService.login({ password, username });
      },
    },
    // signup: {
    //   type: UserType,
    //   args: {
    //     username: { type: GraphQLString },
    //     email: { type: GraphQLString },
    //     password: { type: GraphQLString },
    //     isAFoodTruck: { type: GraphQLBoolean },
    //   },
    //   resolve(parentValue, args) {
    //     return AuthService.signup({...args})
    //   },
    // },
  },
});

module.exports = mutations;
