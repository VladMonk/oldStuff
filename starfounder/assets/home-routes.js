const router = require("express").Router();
const User = require("../assets/models/user");
const Project = require("../assets/models/company");
const mongoose = require("mongoose");

router.post("/", (request, response) => {
  Project.find().limit(3)
  .then((new3Projects) => {
    Project.find().sort({companyEarned: -1}).limit(3)
    .then((top3Projects) => {
      Project.find().sort({companyValue: -1}).limit(3)
      .then((high3Projects) => {
        response.json({success: true, homeProjects: {
          new3Projects: new3Projects,
          top3Projects: top3Projects,
          high3Projects: high3Projects
        }})
      });
    });
  });
});

module.exports = router;

// {{top3Projects[0].companyName}}
//<p><markdown [data]='top3Projects[2].companyDesc.substring(0, 50) + "..."'></markdown></p>
