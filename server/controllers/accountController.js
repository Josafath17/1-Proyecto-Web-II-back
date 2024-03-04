const Account = require("../models/accountModel");
const User = require("../models/userModel");

/**
 * Creates a account
 *
 * @param {*} req
 * @param {*} res
 */
const accountPost = async (req, res) => {
  const account = new Account();

  account.username = req.body.username;
  account.firstName = req.body.firstName;
  account.lastName = req.body.lastName;
  account.pin = req.body.pin;
  account.birth_date = req.body.birth_date;



  if (account.username && account.firstName && account.lastName && account.pin && account.birth_date) {
    await account.save()
      .then(data => {
        res.status(201); // CREATED
        res.header({
          'location': `/api/account/?id=${data.id}`
        });
        res.json(data);
      })
      .catch(err => {
        res.status(422);
        console.log('error while saving the account', err);
        res.json({
          error_code: 1233,
          error: 'There was an error saving the account'
        });
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
    Account.findById(req.query.id)

      .then(account => {
        res.status(200);
        res.json(account);
      })
      .catch(err => {
        res.status(404);
        res.json({ error: "account doesnt exist" })
      });


  } else {
    // get all accounts
    Account.find()
      .then(accounts => {
        res.json(accounts);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
}

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
      if (err || !account) {
        res.status(500);
        console.log('error while queryting the account', err)
        res.json({ error: "account doesnt exist" })
        return;
      }

      //if the account exists
      account.deleteOne(function (err) {
        if (err) {
          res.status(422);
          console.log('error while deleting the account', err)
          res.json({
            error: 'There was an error deleting the account'
          });
        }
        res.status(204); //No content
        res.json({});
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Account doesnt exist" })
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
      if (err || !account) {
        res.status(404);
        console.log('error while queryting the account', err)
        res.json({ error: "account doesnt exist" })
        return
      }

      // update the account object (patch)
      account.username = req.body.username ? req.body.username : account.username;
      account.pin = req.body.pin ? req.body.pin : account.pin;
      account.firstName = req.body.firstName ? req.body.firstName : account.firstName;
      account.lastName = req.body.lastName ? req.body.lastName : account.lastName;
      account.birth_date = req.body.birth_date ? req.body.birth_date : account.birth_date;


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