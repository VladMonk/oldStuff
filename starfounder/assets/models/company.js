const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  companyName: String,
  companyDesc: String,
  companyIMG:{
    type: Array,
    default: []
  },
  companyDefImg: {
    type: String,
    default: "./assets/img/projects/defback.jpg"
  },
  companyOwner: String,
  companyCategory: String,
  companyGenre: String,
  companyDonates: {
    type: Array,
    default: []
  },
  companyValue: Number,
  companyEarned: {
    type: Number,
    default: "0"
  }
});

const Project = mongoose.model("companies", ProjectSchema);

module.exports = Project;

module.exports.addProject = (newProject, callback) => {
  newProject.save(callback);
};
