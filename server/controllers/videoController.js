const Video = require("../models/videoModel");
const Playlist = require("../models/userModel");

/**
 * Creates a video
 *
 * @param {*} req
 * @param {*} res
 */
const videoPost = (req, res) => {
  var video = new Video();

  video.username = req.body.username;
  video.firstName = req.body.firstName;
  video.lastName = req.body.lastName;

  if (video.username && video.firstName && video.lastName) {
    video.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the video', err)
        res.json({
          error: 'There was an error saving the video'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/accounts/?id=${video.id}`
      });
      res.json(video);
    });
  } else {
    res.status(422);
    console.log('error while saving the video')
    res.json({
      error: 'No valid data provided for video'
    });
  }
};

/**
 * Get all accounts
 *
 * @param {*} req
 * @param {*} res
 */
const videoGet = (req, res) => {
  // if an specific video is required
  if (req.query && req.query.id) {
    video.findById(req.query.id, function (err, video) {
      if (err) {
        res.status(404);
        console.log('error while queryting the video', err)
        res.json({ error: "video doesnt exist" })
      }
      res.json(video);
    });
  } else {
    // get all videos
    Video.find(function (err, videos) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(videos);
    });

  }
};

/**
 * Delete one video
 *
 * @param {*} req
 * @param {*} res
 */
const videoDelete = (req, res) => {
  // if an specific video is required
  if (req.query && req.query.id) {
    Video.findById(req.query.id, function (err, video) {
      if (err) {
        res.status(500);
        console.log('error while queryting the video', err)
        res.json({ error: "video doesnt exist" })
      }
      //if the video exists
      if(video) {
        video.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the video"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the video', err)
        res.json({ error: "video doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a video ID" });
  }
};

/**
 * Updates a video
 *
 * @param {*} req
 * @param {*} res
 */
const videoPatch = (req, res) => {
  // get video by id
  if (req.query && req.query.id) {
    Video.findById(req.query.id, function (err, video) {
      if (err) {
        res.status(404);
        console.log('error while queryting the video', err)
        res.json({ error: "video doesnt exist" })
      }

      // update the video object (patch)
      video.username = req.body.username ? req.body.username : video.username;
      video.firstName = req.body.firstName? req.body.firstName : video.firstName;
      video.lastName = req.body.lastName? req.body.lastName : video.lastName;
      // update the video object (put)
      // video.title = req.body.title
      // video.detail = req.body.detail

      video.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the video', err)
          res.json({
            error: 'There was an error saving the video'
          });
        }
        res.status(200); // OK
        res.json(video);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "video doesnt exist" })
  }
};

module.exports = {
  videoGet,
  videoPost,
  videoPatch,
  videoDelete
}