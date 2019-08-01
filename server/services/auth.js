const mongoose = require('mongoose');
const User = mongoose.model('user');
const Post = mongoose.model('post');
const pick = require('../utils/pick');

const login = async ({ password, username }) => {
  return new Promise((resolve, reject) => {
    return User.findByCredentials(username, password).then(user => {
      if (!user || user === 'Invalid Credentials') {
        return reject(new Error('Invalid Credentials'));
      }

      user
        .generateAuthToken()
        .then(token => resolve(token))
        .catch(err => new Error(err));
    });
  }).catch(err => {
    console.log('Error', err);
    return err;
  });
};

const logout = async (user, token) => {
  try {
    if (!user) throw new Error("You aren't logged in");
    await user.removeToken(token);
    return user;
  } catch (err) {
    console.log('Error', err);
    return err;
  }
};

const signup = async ({ email, password, username, isAFoodTruck }) => {
  try {
    const user = new User({ username, email, password, isAFoodTruck });
    await user.save();

    const token = await user.generateAuthToken();
    return token;
  } catch (err) {
    const errors = [];
    if (err.errors) {
      for (const key in err.errors) {
        errors.push(err.errors[key].message);
      }
    } else {
      errors.push(err);
    }
    return Promise.reject(errors);
  }
};

const deleteUser = async user => {
  try {
    await User.findOneAndRemove({ _id: user._id });
    await Post.remove({ _creator: user._id });
    return user._id;
  } catch (err) {
    console.log('Error', err);
    return err;
  }
};

const updateUser = async (args, me) => {
  try {
    const values = pick(args, [
      'bio',
      'email',
      'isAFoodTruck',
      'location',
      'newPassword',
      'profileImg',
      'username',
    ]);

    if (!args.currentPassword) {
      throw new Error('You must enter your password to update your account.');
    } else if (
      !values.username ||
      !values.email ||
      !values.profileImg ||
      !values.bio ||
      !values.location
    ) {
      throw new Error('Missing information');
    }

    const user = await User.findByCredentials(
      me.username.toLowerCase(),
      args.currentPassword
    );

    if (!user || user.err) {
      throw new Error(user.err);
    }

    Object.keys(values).forEach(key => {
      if (key === 'newPassword' && values.newPassword) {
        user.password = values.newPassword;
        return;
      }

      if (user.username !== values.username) {
        user.username_lowercase === values.username.toLowerCase();
      }

      user[key] = values[key];
    });

    await user.save();

    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const rateFoodTruck = async (id, rating) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid id');
    if (rating < 1 || rating > 5) {
      throw new Error(
        `Your rating must be between 1 and 5! You entered ${rating}.`
      );
    }

    const user = await User.findById(id);

    if (!user || !user.isAFoodTruck) {
      throw new Error('This is not a food truck account');
    }

    const totalRating = user.rating.totalRating + rating;
    const numberOfRatings = user.rating.numberOfRatings + 1;
    const average = (totalRating / numberOfRatings).toFixed(1);

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { rating: { average, numberOfRatings, totalRating } } },
      { new: true }
    );
    return updatedUser;
  } catch (err) {
    return err;
  }
};

const followUser = async (userIdToFollow, user) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userIdToFollow)) {
      throw new Error('Invalid id.');
    }
    if (!user) throw new Error("You aren't logged in.");
    if (user.id === userIdToFollow)
      throw new Error("You can't follow yourself.");

    const currentUser = await User.findById(user.id);

    if (currentUser.following.includes(userIdToFollow)) {
      throw new Error('You already follow this user!');
    }

    currentUser.following.push(userIdToFollow);
    return Promise.all([
      User.findByIdAndUpdate(userIdToFollow, { $push: { followers: user.id } }),
      currentUser.save(),
    ])
      .then(() => `Successfully followed user ${userIdToFollow}`)
      .catch(error => error);
  } catch (err) {
    return err;
  }
};

const unfollowUser = async (userIdToUnfollow, user) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userIdToUnfollow)) {
      throw new Error('Invalid id.');
    }
    if (!user) throw new Error("You aren't logged in.");

    return Promise.all([
      User.findByIdAndUpdate(userIdToUnfollow, {
        $pull: { followers: user.id },
      }),
      User.findByIdAndUpdate(user.id, {
        $pull: { following: userIdToUnfollow },
      }),
    ])
      .then(() => userIdToUnfollow)
      .catch(error => error);
  } catch (err) {
    return err;
  }
};

module.exports = {
  login,
  logout,
  signup,
  deleteUser,
  updateUser,
  rateFoodTruck,
  followUser,
  unfollowUser,
};
