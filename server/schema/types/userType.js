const mongoose = require('mongoose');
const graphql = require('graphql');
const Post = mongoose.model('post');
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
          return Post.find({ _creator: parentValue.id });
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
    };
  },
});

module.exports = UserType;
