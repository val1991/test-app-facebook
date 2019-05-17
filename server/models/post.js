const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user_name: { type: String, required: true },
  post_text: { type: String, required: true },
  post_date: { type : String, required: true },
  post_time: { type: String, required: true  },
});

module.exports = mongoose.model('Post', postSchema);