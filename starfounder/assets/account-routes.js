const router = require("express").Router();
const User = require("../assets/models/user");
const Project = require("../assets/models/company");
const mongoose = require("mongoose");
const multer = require("multer");

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

router.post("/:userid", (request, response) => {
  let objId = request.body.pageUserId;
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if(checkForHexRegExp.test(objId)){
    User.findById(objId).then((existingUser) => {
      if(existingUser){
        let userProjects = [];
        let l = existingUser.userOwnCompanies.length;
        Project.find({companyOwner: objId})
        .then((userProjects) => {
          Project.find({companyDonates: { $elemMatch: {donaterId: objId}}})
          .then((userDonates) => {
            //
            User.findById(request.body.currentUserId).then((curUser) => {
              response.json({success: true, pageUser: {
                pageFirstName: existingUser.userFirstName,
                pageLastName: existingUser.userLastName,
                pageUserPhoto: existingUser.userPhoto,
                pageUserDesc: existingUser.userDescription,
                pageUserIsAdmin: existingUser.userIsAdmin,
                pageUserProjects: userProjects,
                pageUserDonates: userDonates,
                currentUserIsAdmin: curUser.userIsAdmin
              }});
            });
          });
        });
      }else{
        response.json({success: false});
      }
    });
  } else {
    response.json({success: false});
  }
});

router.post("/:userid/head", (request, response) => {
  let objId = request.body.curId;
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if(checkForHexRegExp.test(objId)){
    User.findById(objId).then((existingUser) => {
      if(existingUser){
        response.json({success: true, curUser: {
          curFirstName: existingUser.userFirstName,
          curLastName: existingUser.userLastName,
          curUserPhoto: existingUser.userPhoto
        }});
      }else{
        response.json({success: false});
      }
    });
  } else {
    response.json({success: false});
  }
});

//!!!!!
router.post("/:userid/edit", (request, response) => {
  let objId = request.body.pageUserId;
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if(checkForHexRegExp.test(objId)){
    if(!request.body.change){
      User.findById(objId).then((existingUser) => {
        if(existingUser){
          response.json({success: true, loadData: {
            loadfirstname: existingUser.userFirstName,
            loadlastname: existingUser.userLastName,
            loaddescription: existingUser.userDescription
          }});
        }else{
          response.json({success: false});
        }
      });
    } else {
      User.findByIdAndUpdate(objId,{ $set: {
        userFirstName: request.body.firstname,
        userLastName: request.body.lastname,
        userDescription: request.body.description
      }}, (error, user) => {
        if(error) throw error;
      });
      response.json({success: true});
    }
  } else {
    response.json({success: false});
  }
});





const storeFile = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./starfounder-front-end-app/src/assets/img/users")
  },
  filename: (req, file, callback) => {
    callback(null, `sf_user_${file.originalname}`)
  }
});

let upload = multer({storage: storeFile});



router.post("/:userid/file", upload.single('file'), (request, response) =>{
  console.log(request.file);
  console.log(request.params.userid);
  let newImgPath = "./assets/img/users/" + request.file.filename;
  User.findByIdAndUpdate(request.params.userid, {$set: {
    userPhoto: "./assets/img/users/" + request.file.filename
  }}, (error, user) => {
    if(error) throw error;
  }).then((upUser) => {
    response.json({success: true});
  });

});



router.post("/:userid/adminned", (request, response) => {
  if(checkForHexRegExp.test(request.body.pageUserId)){
    User.findByIdAndUpdate(request.body.pageUserId, {$set: {
      userIsAdmin: request.body.adValue
    }}, (error, user) => {
      if(error) throw error;
    });
    response.json({success: true});
  } else {
    response.json({success: true});
  }
});



module.exports = router;
