const mongoose = require('mongoose');

const PostSchema = {
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: {
    type: Number,
    default: 0,
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  text: {
    type: String,
    required: true,
    maxlength: 300,
    minlength: 1,
    trim: true,
  },
  timeCreated: {
    type: Number,
    default: null,
  },
};

mongoose.model('post', PostSchema);
