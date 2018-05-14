const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _creator: { required: true, type: Schema.Types.ObjectId },
  likedBy: [{ type: Schema.Types.ObjectId }],
  location: { lat: { type: Number }, lng: { type: Number } },
  text: {
    type: String,
    required: true,
    maxlength: 300,
    minlength: 1,
    trim: true,
  },
  timeCreated: { type: Number, default: null },
});

mongoose.model('post', PostSchema);
