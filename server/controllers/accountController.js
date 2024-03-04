const Account = require("../models/accountModel");
const User = require("../models/userModel");

/**
 * Creates a account
 *
 * @param {*} req
 * @param {*} res
 */
const accountPost = (req, res) => {
  var account = new Account();

  account.username = req.body.username;
  account.firstName = req.body.firstName;
  account.lastName = req.body.lastName;

  if (account.username && account.firstName && account.lastName) {
    account.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the account', err)
        res.json({
          error: 'There was an error saving the account'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/accounts/?id=${account.id}`
      });
      res.json(account);
    });
  } else {
    res.status(422);
    console.log('error while saving the account')
    res.json({
      error: 'No valid data provided for account'
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
  // if an specific account is required
  if (req.query && req.query.id) {
    AccountPostccount.findById(req.query.id, function (err, account) {
      if (err) {
        res.status(404);
        console.log('error while queryting the account', err)
        res.json({ error: "account doesnt exist" })
      }
      res.json(account);
    });
  } else {
    // get all accounts
    Account.find(function (err, accounts) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(accounts);
    });

  }
};

/**
 * Delete one account
 *
 * @param {*} req
 * @param {*} res
 */
const accountDelete = (req, res) => {
  // if an specific account is required
  if (req.query && req.query.id) {
    Account.findById(req.query.id, function (err, account) {
      if (err) {
        res.status(500);
        console.log('error while queryting the account', err)
        res.json({ error: "account doesnt exist" })
      }
      //if the account exists
      if(account) {
        account.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the account"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the account', err)
        res.json({ error: "account doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a account ID" });
  }
};

/**
 * Updates a account
 *
 * @param {*} req
 * @param {*} res
 */
const accountPatch = (req, res) => {
  // get account by id
  if (req.query && req.query.id) {
    Account.findById(req.query.id, function (err, account) {
      if (err) {
        res.status(404);
        console.log('error while queryting the account', err)
        res.json({ error: "account doesnt exist" })
      }

      // update the account object (patch)
      account.username = req.body.username ? req.body.username : account.username;
      account.firstName = req.body.firstName? req.body.firstName : account.firstName;
      account.lastName = req.body.lastName? req.body.lastName : account.lastName;
      // update the account object (put)
      // account.title = req.body.title
      // account.detail = req.body.detail

      account.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the account', err)
          res.json({
            error: 'There was an error saving the account'
          });
        }
        res.status(200); // OK
        res.json(account);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "account doesnt exist" })
  }
};

module.exports = {
  accountGet,
  accountPost,
  accountPatch,
  accountDelete
}