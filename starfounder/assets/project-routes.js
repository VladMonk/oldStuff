const router = require("express").Router();
const User = require("../assets/models/user");
const Project = require("../assets/models/company");
const mongoose = require("mongoose");




router.post("/:userid/new", (request, response) => {
  let objId = request.body.pageUserId;
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if(checkForHexRegExp.test(objId)){
    if(!request.body.change){
      User.findById(objId).then((existingUser) => {
        if(existingUser){
          response.json({success: true});
        }else{
          response.json({success: false});
        }
      });
    } else {
      let newProject = new Project({
        companyName: request.body.projectname,
        companyDesc: request.body.projectdescription,
        companyOwner: request.body.pageUserId,
        companyValue: request.body.projectvalue
      });
      Project.addProject(newProject, (error, project) => {
        if(error){
          response.json({success: false, msg: "project not added"});
        }else{
          User.findByIdAndUpdate(objId,
            {"$push": {"userOwnCompanies": newProject._id}
          }, (error, user) => {
            if(error) throw error;
          });
          response.json({success: true, msg: "project added", projectid: newProject._id});
        }
      });
    }
  } else {
    response.json({success: false});
  }
});

router.post("/:projectid/donate", (request, response) => {
  let prjctId = request.body.projectId;
  console.log(prjctId);
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if(checkForHexRegExp.test(prjctId)){
    Project.findByIdAndUpdate(prjctId, {
      $push:
      {
        companyDonates:{
          donaterId: request.body.currentUserId,
          moneyCome: parseInt(request.body.donatevalue, 10)
        }
      },
      $inc:
      {
        companyEarned: (parseInt(request.body.donatevalue, 10))
      }
    }, (error, project) => {
      if(error) throw error;
    });
    let usrId = request.body.currentUserId;
    User.findByIdAndUpdate(usrId, {
      $push:
      {
        userDonateCompanies: {
          projectId: prjctId,
          moneyGive: parseInt(request.body.donatevalue, 10)
        }
      }
    }, (error, user) => {
      if(error) throw error;
    });
    response.json({success: true});
  } else {
    response.json({success: false});
  }
});

router.post("/:userid/:projectid", (request, response) => {
  let usrId = request.body.pageUserId;
  let prjctId = request.body.projectId;
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if(checkForHexRegExp.test(usrId) && checkForHexRegExp.test(prjctId)){
    User.findOne({_id: usrId, userOwnCompanies: {$in: [mongoose.Types.ObjectId(prjctId)]}})
    .then((existingUser) => {
      if(existingUser){
        Project.findById(prjctId).then((existingProject) => {
          response.json({success: true, project: {
            projectname: existingProject.companyName,
            projectdescription: existingProject.companyDesc,
            projectowner: existingUser.userFirstName,
            projectphoto: existingProject.companyDefImg
          }});
        });
      } else {
        response.json({success: false});
      }
    });
  } else {
    response.json({success: false});
  }
});


router.post("/:userid/:projectid/editload", (request, response) => {
  let usrId = request.body.pageUserId;
  let prjctId = request.body.pageProjectId;
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  console.log(request.body);
  if(checkForHexRegExp.test(usrId) && checkForHexRegExp.test(prjctId)){
    Project.findById(prjctId).then((existingProject) => {
      if(existingProject){
        response.json({success: true, loadData: {
          loadProjectName: existingProject.companyName,
          loadDesc: existingProject.companyDesc,
          loadValue: existingProject.companyValue
        }});
      }else{
        response.json({success: false});
      }
    });
  } else {
    response.json({success: false});
  }
});

router.post("/:userid/:projectid/edit", (request, response) => {
  let usrId = request.body.pageUserId;
  let prjctId = request.body.pageProjectId;
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if(checkForHexRegExp.test(usrId) && checkForHexRegExp.test(prjctId)){
    Project.findByIdAndUpdate(prjctId,{ $set: {
      companyName: request.body.projectname,
      companyDesc: request.body.projectdescription,
      companyValue: request.body.projectvalue
    }}, (error, project) => {
      if(error) throw error;
    });
    response.json({success: true});
  }
});

router.post("/all", (request, response) => {
  Project.find().then((projectsArray) => {
    if(projectsArray){
      User.findById(request.body.currentUserId).then((curUser) => {
        response.json({success: true, resData:{
          projectsArray: projectsArray,
          isAdmin: curUser.userIsAdmin
        }});

      });
      //response.json({success: true, projectsArray});
    } else {
      response.json({success: false});
    }
  });
});

module.exports = router;
