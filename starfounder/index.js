const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./assets/config/keys");
const multer = require("multer");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("assets"));

app.use(passport.initialize());
app.use(passport.session());


require("./assets/config/jwt-setup")(passport);

//turn ejs(disable after angular inject)
app.set("view engine", "ejs");

//starting page redirect
app.get("/", function(request, response){
  response.redirect("/home/");
})
//user roating
const accRoutes = require("./assets/account-routes");
app.use("/account", accRoutes);

//authenticate roating
const authRoutes = require("./assets/auth-routes");
app.use("/auth", authRoutes);

//home roating
const homeRoutes = require("./assets/home-routes");
app.use("/home", homeRoutes);

//project roating
const projectRoutes = require("./assets/project-routes");
app.use("/project", projectRoutes);

app.listen(port, () => {
  console.log("server start, port: " + port);
});

//connection to mongodb
mongoose.connect(keys.mongodb.starfounderdbURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
 });

//ES6 Promises
mongoose.Promise = global.Promise;

//check connection to mongodb
mongoose.connection.once("open", () => {
  console.log("connection up");
}).on("error", (error) => {
  console.log("connection close, cuz: " + error);
});
