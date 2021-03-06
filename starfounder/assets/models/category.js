const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  CategoryID: String,
  CategoryName: String,
  CategoryCompanies: {
    type: Array,
    default: []
  }
});

const Category = mongoose.model("categories", CategorySchema);

module.exports = Category;
