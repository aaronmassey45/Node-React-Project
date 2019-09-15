const graphql = require('graphql');

const PostType = require('./postType');
const SearchableType = require('./searchableType');
const UserType = require('./userType');
const Post = require('../../models/post');
const User = require('../../models/user');
const UserService = require('../../services/user');

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
      resolve(_, args, { user }) {
        if (!user) throw new Error('You are not authenticated.');
        return user;
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
      },
      async resolve(_, { id, username }) {
        try {
          if (!id && !username) {
            throw new Error('You must provide an username or user id.');
          } else if (id && username) {
            throw new Error('Only provide one search argument.');
          }

          const username_lowercase = username
            ? username.toLowerCase()
            : undefined;

          const user = await User.findOne({
            $or: [{ _id: id }, { username_lowercase }],
          });

          if (!user) throw new Error('User does not exist.');
          return user;
        } catch (err) {
          return err;
        }
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
    search: {
      type: new GraphQLList(SearchableType),
      args: { searchTerm: { type: GraphQLString } },
      resolve(_, { searchTerm }) {
        const regex = {
          $regex: searchTerm,
          $options: 'i',
        };

        const users = User.find({ username: regex });
        const posts = Post.find({ text: regex });

        return Promise.all([users, posts])
          .then(values => {
            const [foundUsers, foundPosts] = values;
            return [...foundUsers, ...foundPosts];
          })
          .catch(err => err);
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
