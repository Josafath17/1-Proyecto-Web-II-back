const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const account = new Schema({
  username: { type: String },
  pin: { type: Number },
  firstName: { type: String },
  lastName: { type: String },
  
  user: {
    type: mongoose.ObjectId,
    ref: 'User'
  }






});

module.exports = mongoose.model('accounts', account);