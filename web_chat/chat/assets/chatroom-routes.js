const router = require("express").Router();

const authCheck = (request, response, next) => {
  if(!request.user){
    response.redirect("/auth/login");
  } else{
    next();
  }
};

router.get("/", authCheck, function(request, response){
  //response.sendFile(__dirname + "/html/main.html");
  response.render(__dirname + "/html/main.ejs", {user: request.user});
});

module.exports = router;
