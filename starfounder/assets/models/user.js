const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const userConfig = require("../config/userconfig");
const bcrypt = require("bcryptjs");
const UserSchema = new Schema({

  userFirstName: String,
  userLastName: String,
  userPassword: String,
  userDescription: String,
  userEmail:{
    type: String,
    unique: true
  },
  userPhoto: {
    type: String,
    default: "./assets/img/users/avatar_default.jpg"
  },
  userDonateCompanies: {
    type: Array,
    default: []
  },
  userOwnCompanies: {
    type: Array,
    default: []
  },
  userIsAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;


module.exports.getUserByEmail = (email, callback) => {
  const findEmail = {userEmail: email};
  User.findOne(findEmail, callback);
};

module.exports.getUserByID = (id, callback) => {
  User.findById(id, callback);
};

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(newUser.userPassword, salt, (error, hash) => {
      if(error) throw error;
      newUser.userPassword = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = (inputPassword, validPassword, callback) => {
  bcrypt.compare(inputPassword, validPassword, (error, isMatch) => {
    if(error) throw error;
    callback(null, isMatch);
  });
};
