const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const authRoutes = require("./assets/auth-routes.js");
const chatRoutes = require("./assets/chatroom-routes.js");
const mongoose = require("mongoose");
const keys = require("./assets/config/keys.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const Mess = require("./assets/models/message-model.js");

app.use(express.static("assets"));

//ejs on
app.set("view engine", "ejs");

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.userdbURI, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log("db is connect");
});


app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

server.listen(8080);

app.get("/", function(request, response){
  response.redirect("/chat/")
})

connections = [];

io.sockets.on("connection", function(socket){
  connections.push(socket);
  console.log(socket.id);
  socket.on("disconnect", function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log(socket.id);
  });
  socket.on("send_message", function(msg_content, userid, username, userphoto){
    io.sockets.emit("add_message", {msg: msg_content, id: userid, name: username, photo: userphoto});

    new Mess({
      id: userid,
      message: msg_content
    }).save().then((newMess) => {
      console.log("new mess: " + newMess);

    });

  });
});
