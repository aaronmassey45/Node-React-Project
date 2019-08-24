const graphql = require('graphql');

const Post = require('../../models/post');
const User = require('../../models/user');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    const PostType = require('./postType');
    return {
      id: { type: GraphQLID },
      bio: { type: GraphQLString },
      email: { type: GraphQLString },
      location: { type: GraphQLString },
      profileImg: { type: GraphQLString },
      username: { type: GraphQLString },
      isAFoodTruck: { type: GraphQLBoolean },
      posts: {
        type: new GraphQLList(PostType),
        resolve(parentValue) {
          return Post.find({ _creator: parentValue.id })
            .sort({ $natural: -1 })
            .limit(100);
        },
      },
      likedPosts: {
        type: new GraphQLList(PostType),
        resolve(parentValue) {
          return parentValue.likedPosts.map(post => Post.findById(post));
        },
      },
      rating: {
        type: new GraphQLObjectType({
          name: 'Rating',
          fields: () => ({
            average: { type: GraphQLString },
            numberOfRatings: { type: GraphQLInt },
            totalRating: { type: GraphQLInt },
          }),
        }),
      },
      following: {
        type: new GraphQLList(UserType),
        resolve(parentValue) {
          return parentValue.following.map(user => User.findById(user));
        },
      },
      followers: {
        type: new GraphQLList(UserType),
        resolve(parentValue) {
          return parentValue.followers.map(user => User.findById(user));
        },
      },
    };
  },
});

module.exports = UserType;
