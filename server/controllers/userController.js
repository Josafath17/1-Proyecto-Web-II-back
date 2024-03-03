const User = require("../models/accountModel");


/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */
const AccountPost = (req, res) => {
  var user = new User();

  user.username = req.body.username;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  if (user.username && user.firstName && user.lastName) {
    user.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the user', err)
        res.json({
          error: 'There was an error saving the user'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/accounts/?id=${user.id}`
      });
      res.json(user);
    });
  } else {
    res.status(422);
    console.log('error while saving the user')
    res.json({
      error: 'No valid data provided for user'
    });
  }
};

/**
 * Get all accounts
 *
 * @param {*} req
 * @param {*} res
 */
const accountGet = (req, res) => {
  // if an specific user is required
  if (req.query && req.query.id) {
    user.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "user doesnt exist" })
      }
      res.json(user);
    });
  } else {
    // get all accounts
    User.find(function (err, accounts) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(accounts);
    });

  }
};

/**
 * Delete one user
 *
 * @param {*} req
 * @param {*} res
 */
const accountDelete = (req, res) => {
  // if an specific user is required
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(500);
        console.log('error while queryting the user', err)
        res.json({ error: "user doesnt exist" })
      }
      //if the user exists
      if(user) {
        user.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the user"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "user doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a user ID" });
  }
};

/**
 * Updates a user
 *
 * @param {*} req
 * @param {*} res
 */
const accountPatch = (req, res) => {
  // get user by id
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "user doesnt exist" })
      }

      // update the user object (patch)
      user.username = req.body.username ? req.body.username : user.username;
      user.firstName = req.body.firstName? req.body.firstName : user.firstName;
      user.lastName = req.body.lastName? req.body.lastName : user.lastName;
      // update the user object (put)
      // user.title = req.body.title
      // user.detail = req.body.detail

      user.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the user', err)
          res.json({
            error: 'There was an error saving the user'
          });
        }
        res.status(200); // OK
        res.json(user);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "user doesnt exist" })
  }
};

module.exports = {
  accountGet,
  accountPost,
  accountPatch,
  accountDelete
}