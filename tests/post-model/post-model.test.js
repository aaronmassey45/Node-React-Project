const mongoose = require('mongoose');

const Post = require('../../models/post');

const userId = new mongoose.Types.ObjectId();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

afterAll(async () => {
  await Post.deleteMany();
  await mongoose.connection.close();
});

test('Should create post according to schema', async () => {
  const text = 'I am the greatest!';
  await new Post({ text, _creator: userId }).save();

  const post = await Post.findOne({ _creator: userId });

  expect(post.text).toBe(text);
  expect(post.timeCreated).toBeTruthy();
  expect(post._creator.toString()).toBe(userId.toString());
  expect(Array.isArray(post.likedBy)).toBe(true);
});

test('Should not be able to update timeCreated', async () => {
  const text1 = 'I am the greatest!';
  const text2 = 'I am not the greatest!';
  const timeCreated = Date.now();

  const savedPost = await new Post({ text: text1, _creator: userId }).save();

  const post = await Post.findOneAndUpdate(
    { _creator: userId },
    { timeCreated, text: text2 },
    { new: true }
  );

  expect(post.text).toBe(text2);
  expect(post.timeCreated).not.toBe(timeCreated);
  expect(post.timeCreated).toBe(savedPost.timeCreated);
});

test('Should not create post without text', async () => {
  const post = new Post({ _creator: userId });

  post.validate(err => {
    expect(err.errors.text).toBeTruthy();
  });
});

test('Should not create post with empty text', async () => {
  const post = new Post({ text: '', _creator: userId });

  post.validate(err => {
    expect(err.errors.text).toBeTruthy();
  });
});

test('Should not create post without _creator', async () => {
  const post = new Post({ text: 'Hello world!' });

  post.validate(err => {
    expect(err.errors._creator).toBeTruthy();
  });
});
