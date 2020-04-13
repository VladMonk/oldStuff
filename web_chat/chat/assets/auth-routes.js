const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("./config/passport-setup.js");

router.get("/login", function(request, response){
  //response.sendFile(__dirname + "/html/login.html");
  response.render(__dirname + "/html/login.ejs");
});


router.get("/logout", function(request, response){
  response.send("loging out");
});


router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));

router.get("/google/redirect", passport.authenticate("google"), function(request, response){
  response.redirect("/chat/");
});

module.exports = router;
