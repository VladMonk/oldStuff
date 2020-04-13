const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/starfounder", {
     useNewUrlParser: true,
     useUnifiedTopology: true
   });
  mongoose.connection.once("open", () => {
    console.log("connection up");
    done();
  }).on("error", (error) => {
    console.log("connection close, cuz: " + error);
  });
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
