// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
//?
//const User = require("../models/user");

// module.exports.getUserByEmail = (email, callback) => {
//   const findEmail = {userEmail: email};
//   User.findOne(findEmail, callback);
// };
//
// module.exports.getUserByID = (id, callback) => {
//   User.findById(id, callback);
// };
//
// module.exports.addUser = (newUser, callback) => {
//   bcrypt.genSalt(10, (error, salt) => {
//     bcrypt.hash(newUser.userPassword, salt, (error, hash) => {
//       if(error) throw error;
//       newUser.userPassword = hash;
//       newUser.save(callback);
//     });
//   });
// };
//
// module.exports.comparePassword = (inputPassword, validPassword, callback) => {
//   bcrypt.compare(inputPassword, validPassword, (error, isMatch) => {
//     if(error) throw error;
//     callback(null, isMatch);
//   });
// };
