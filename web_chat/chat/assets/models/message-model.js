const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const messSchema = new Schema({
  id: String,
  message: String
});



const Mess = mongoose.model("message", messSchema);

module.exports = Mess;
