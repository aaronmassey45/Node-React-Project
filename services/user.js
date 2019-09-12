const mongoose = require('mongoose');

const pick = require('../utils/pick');
const { sendAccountRemovedEmail } = require('../emails/account');

const Post = mongoose.model('post');
const User = mongoose.model('user');

const deleteUser = async user => {
  try {
    if (!user) throw new Error('You are not authenticated');

    await User.findOneAndRemove({ _id: user._id });
    await Post.deleteMany({ _creator: user._id });
    sendAccountRemovedEmail(user.email);
    return user._id;
  } catch (err) {
    return err;
  }
};

const followUser = async (userIdToFollow, currentUser) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userIdToFollow)) {
      throw new Error('Invalid id.');
    }
    if (!currentUser) throw new Error("You aren't logged in.");
    if (currentUser.id === userIdToFollow)
      throw new Error("You can't follow yourself.");

    if (currentUser.following.includes(userIdToFollow)) {
      throw 'You already follow this user.';
    }

    currentUser.following.push(userIdToFollow);

    await User.findByIdAndUpdate(userIdToFollow, {
      $push: { followers: currentUser.id },
    });
    await currentUser.save();

    return `Successfully followed user ${userIdToFollow}`;
  } catch (err) {
    return err;
  }
};

const rateFoodTruck = async (id, rating, currentUser) => {
  try {
    if (!currentUser) throw new Error('You are not authenticated.');
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

const updateUser = async (args, me) => {
  try {
    const values = pick(args, [
      'bio',
      'email',
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
    return err;
  }
};

const verifyUserAccount = async (username, token) => {
  try {
    const user = await User.findByToken(token);
    if (!user || user.username !== username) {
      throw new Error('Unable to verify account.');
    }
    if (user.isEmailVerified) {
      throw new Error('You have already verified your email!');
    }

    user.isEmailVerified = true;
    await user.save();

    return 'Success';
  } catch (err) {
    return err;
  }
};

module.exports = {
  deleteUser,
  followUser,
  rateFoodTruck,
  unfollowUser,
  updateUser,
  verifyUserAccount,
};
