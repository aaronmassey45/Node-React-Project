const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');

const User = mongoose.model('user');

module.exports = app => {
  app.get('/api/userlist', async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/api/users/me', authenticate, async (req, res) => {
    try {
      res.send(req.user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.delete('/api/users/me', authenticate, async (req, res) => {
    try {
      const user = await User.findOneAndRemove({ _id: req.user._id });
      if (!user) return res.status(400).send();
      await Post.remove({ _creator: req.user._id });
      res.send({ removedUser: user });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.patch('/api/users/me', authenticate, async (req, res) => {
    try {
      const body = _.pick(req.body, [
        'bio',
        'currentPassword',
        'email',
        'isAFoodTruck',
        'location',
        'newPassword',
        'profileImg',
        'username',
      ]);

      if (
        !body.username ||
        !body.email ||
        !body.currentPassword ||
        !body.profileImg ||
        !body.bio ||
        !body.location
      ) {
        return res.status(400).send({ error: 'Missing information' });
      }

      const user = await User.findByCredentials(
        req.user.username,
        body.currentPassword
      );

      if (user === 'Incorrect password' || user === 'No user found') {
        return res.status(400).send({ error: user });
      }

      if (body.newPassword) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(body.newPassword, salt, (err, hash) => {
            body.newPassword = hash;
          });
        });
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            bio: body.bio,
            email: body.email,
            isAFoodTruck: body.isAFoodTruck || false,
            location: body.location,
            password: body.newPassword || user.password,
            profileImg: body.profileImg,
            username: body.username,
          },
        },
        { new: true, runValidators: true }
      );
      res.send(updatedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/api/users/account/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).send();
      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/api/signup/newuser', async (req, res) => {
    try {
      const body = _.pick(req.body, [
        'username',
        'email',
        'password',
        'isAFoodTruck',
      ]);

      const userInfo = {
        email: body.email,
        isAFoodTruck: body.isAFoodTruck,
        password: body.password,
        username: body.username,
      };

      const user = new User(userInfo);
      await user.save();
      const token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.post('/api/user/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findByCredentials(username, password);
      const token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.delete('/api/logout', authenticate, async (req, res) => {
    try {
      await req.user.removeToken(req.token);
      res.status(200).send();
    } catch (e) {
      res.status(400).send();
    }
  });

  app.patch('/api/rate/user/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['rating']);
    if (!ObjectID.isValid(id)) return res.status(404).send();
    if (body.rating < 1)
      return res.status(400).send({ error: 'Rating too low' });

    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).send();
      if (!user.isAFoodTruck)
        return res.status(400).send('Not a food truck account');

      const totalRating = user.rating.totalRating + body.rating;
      const numberOfRatings = user.rating.numberOfRatings + 1;
      const average = (totalRating / numberOfRatings).toFixed(1);

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: { rating: { average, numberOfRatings, totalRating } } },
        { new: true }
      );
      res.send({ updatedUser });
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
