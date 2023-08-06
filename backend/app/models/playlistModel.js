const mongoose = require('../../config/db');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  public: { type: Boolean, default: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movies: []
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
