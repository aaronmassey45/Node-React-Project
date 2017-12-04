let mongoose = require('mongoose');

let Post = mongoose.model('Post', {
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  likes: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
  timeCreated: {
    type: Number,
    default: null
  }
});

module.exports = {Post};
