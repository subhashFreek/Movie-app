const Playlist = require('../models/playlistModel');

// Get all playlists
module.exports.userPublic = async (req, res) => {
  try {
    const user = req.user._id;
    let page = req.query.page ? parseInt(req.query.page) : 0;
    let size = req.query.size ? parseInt(req.query.size) : 10;
    const playlists = await Playlist.find({public: true, user}).skip(page*size).limit(size);
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
};

module.exports.userPrivate = async (req, res) => {
  try {
    const user = req.user._id;
    let page = req.query.page ? parseInt(req.query.page) : 0;
    let size = req.query.size ? parseInt(req.query.size) : 10;
    const playlists = await Playlist.find({public: false, user}).skip(page*size).limit(size);
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
};

module.exports.allPublic = async (req, res) => {
  try {
    let page = req.query.page ? parseInt(req.query.page) : 0;
    let size = req.query.size ? parseInt(req.query.size) : 10;
    const playlists = await Playlist.find({public: true}).skip(page*size).limit(size);
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
};

// Get a single playlist by ID
module.exports.getById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
};

// Add a new playlist
module.exports.create = async (req, res) => {
  try {
    const { name, public } = req.body;
    const user = req.user._id;
    const newPlaylist = new Playlist({ name, public, user, movies });
    const savedPlaylist = await newPlaylist.save();
    res.json(savedPlaylist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add playlist' });
  }
};

// Update a playlist by ID
module.exports.update = async (req, res) => {
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlaylist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update playlist' });
  }
};

// Delete a playlist by ID
module.exports.delete = async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
};
