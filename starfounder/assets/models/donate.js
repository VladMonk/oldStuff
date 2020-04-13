const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonateSchema = new Schema({
  CompanyID: String,
  TotalFound: Number,
  ActualFound: {
    type: Number,
    default: 0
  }
});

const Donate = mongoose.model("donates", DonateSchema);

module.exports = Donate;
