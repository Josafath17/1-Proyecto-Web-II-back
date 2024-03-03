const Playlist = require("../models/playlistModel");
const Video = require("../models/userModel");
/**
 * Creates a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const playlistPost = (req, res) => {
  var playlist = new Playlist();

  playlist.username = req.body.username;
  playlist.firstName = req.body.firstName;
  playlist.lastName = req.body.lastName;

  if (playlist.username && playlist.firstName && playlist.lastName) {
    playlist.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the playlist', err)
        res.json({
          error: 'There was an error saving the playlist'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/playlists/?id=${playlist.id}`
      });
      res.json(playlist);
    });
  } else {
    res.status(422);
    console.log('error while saving the playlist')
    res.json({
      error: 'No valid data provided for playlist'
    });
  }
};

/**
 * Get all playlists
 *
 * @param {*} req
 * @param {*} res
 */
const playlistGet = (req, res) => {
  // if an specific playlist is required
  if (req.query && req.query.id) {
    Playlist.findById(req.query.id, function (err, playlist) {
      if (err) {
        res.status(404);
        console.log('error while queryting the playlist', err)
        res.json({ error: "playlist doesnt exist" })
      }
      res.json(playlist);
    });
  } else {
    // get all playlists
    Playlist.find(function (err, playlists) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(playlists);
    });

  }
};

/**
 * Delete one playlist
 *
 * @param {*} req
 * @param {*} res
 */
const playlistDelete = (req, res) => {
  // if an specific playlist is required
  if (req.query && req.query.id) {
    Playlist.findById(req.query.id, function (err, playlist) {
      if (err) {
        res.status(500);
        console.log('error while queryting the playlist', err)
        res.json({ error: "playlist doesnt exist" })
      }
      //if the playlist exists
      if(playlist) {
        playlist.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the playlist"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the playlist', err)
        res.json({ error: "playlist doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a playlist ID" });
  }
};

/**
 * Updates a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const playlistPatch = (req, res) => {
  // get playlist by id
  if (req.query && req.query.id) {
    Playlist.findById(req.query.id, function (err, playlist) {
      if (err) {
        res.status(404);
        console.log('error while queryting the playlist', err)
        res.json({ error: "playlist doesnt exist" })
      }

      // update the playlist object (patch)
     // playlist.username = req.body.username ? req.body.username : playlist.username;
      //playlist.firstName = req.body.firstName? req.body.firstName : playlist.firstName;
     // playlist.lastName = req.body.lastName? req.body.lastName : playlist.lastName;
      // update the playlist object (put)
      // playlist.title = req.body.title
      // playlist.detail = req.body.detail

      playlist.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the playlist', err)
          res.json({
            error: 'There was an error saving the playlist'
          });
        }
        res.status(200); // OK
        res.json(playlist);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "playlist doesnt exist" })
  }
};

module.exports = {
  playlistGet,
  playlistPost,
  playlistPatch,
  playlistDelete
}