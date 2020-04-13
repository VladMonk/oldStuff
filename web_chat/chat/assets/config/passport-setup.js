const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys.js");
const User = require("../models/user-model.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })

});

passport.use(
  new GoogleStrategy({
  //options 4 strategy
  callbackURL: "/auth/google/redirect",
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {

  User.findOne({googleid: profile.id}).then((currentUser) => {
    if(currentUser){

      done(null, currentUser);
    }else{
      new User({
        username: profile.displayName,
        googleid: profile.id,
        userphoto: profile._json.picture
      }).save().then((newUser) => {

        done(null, newUser);
      });
    }
  })
}));
