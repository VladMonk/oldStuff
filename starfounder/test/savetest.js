const assert = require("assert");

const User = require("../assets/models/user");
//const Company = require("../assets/models/company");
//const Category = require("../assets/models/category");
//const Donate = require("../assets/models/donate");

describe("Finding records", () => {
  it("FindById", (done) => {

    var usr = "54e1d5be7819da7a734b12ed";
    var user = "54";


    User.findById(usr).then((existingUser) => {

      assert(existingUser === true);
    });

  });
});
