const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _creator: { required: true, type: Schema.Types.ObjectId },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  location: { lat: { type: Number }, lng: { type: Number } },
  text: {
    type: String,
    required: [true, 'You can not submit an empty chowt!'],
    maxlength: 300,
    minlength: 1,
    trim: true,
  },
  timeCreated: {
    type: Number,
    default: Date.now(),
    immutable: true,
  },
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
