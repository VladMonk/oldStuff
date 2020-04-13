const router = require("express").Router();
const User = require("./models/user");
const jwt = require("jsonwebtoken");

//?
const passport = require("passport");
const keys = require("./config/keys");


//получение и обработка рег данных
router.post("/reg", (request, response) => {
  let newUser = new User({
    userFirstName: request.body.firstname,
    userLastName: request.body.lastname,
    userPassword: request.body.password,
    userEmail:request.body.email
  });
  User.addUser(newUser, (error, user) => {
    if(error){
      response.json({success: false, msg: "user not added"});
    }else{
      response.json({success: true, msg: "user added"});
    }
  });
});


//получение и обработка лог данных
router.post("/log", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  User.getUserByEmail(email, (error, user) => {
    if(error) throw error;
    if(!user){
      return response.json({success: false, msg: "user 404"});
    }
    User.comparePassword(password, user.userPassword, (error, isMatch) => {
      if(error) throw error;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), keys.secretKey, {
          expiresIn: 1000 * 60 * 30
        });
        response.json({success: true, token: "JWT " + token, user: {
          id: user._id,
          firstname: user.userFirstName,
          lastname: user.userLastName,
          email: user.userEmail,
          photo: user.userPhoto
        }});
      }else{
        return response.json({success: false, msg: "invalid password"});
      }
    });
  });
});

module.exports = router;
