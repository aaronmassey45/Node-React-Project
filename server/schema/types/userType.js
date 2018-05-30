const mongoose = require('mongoose');
const graphql = require('graphql');
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
  fields: () => ({
    id: { type: GraphQLID },
    bio: { type: GraphQLString },
    email: { type: GraphQLString },
    location: { type: GraphQLString },
    profileImg: { type: GraphQLString },
    username: { type: GraphQLString },
    likedPosts: {
      type: new GraphQLList(GraphQLID),
    },
    isAFoodTruck: { type: GraphQLBoolean },
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
  }),
});

module.exports = UserType;
