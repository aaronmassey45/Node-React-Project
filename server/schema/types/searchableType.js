const graphql = require('graphql');

const UserType = require('./userType');
const PostType = require('./postType');

const SearchableType = new graphql.GraphQLUnionType({
  name: 'Searchable',
  types: [UserType, PostType],
  resolveType(value) {
    if (value.username) {
      return UserType;
    }
    if (value.text) {
      return PostType;
    }
  },
});

module.exports = SearchableType;
