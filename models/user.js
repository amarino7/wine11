"use strict";

var bcrypt = require("bcrypt");
var passport = require("passport");
var passportLocal = require("passport-local");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING
  }, {
    instanceMethods: {
      checkPassword: function (password) {
        return bcrypt.compareSync(password, this.password_digest);
      }
    },
    classMethods: {
      associate: function(models) {
        // associating to wineries model
        this.hasMany(models.wineries);
      },
      findByEmail: function (email) {
        return this.find({
          where: {
            email: email
          }
        });
      },
      encryptPassword: function (password) {
        var salt = bcrypt.genSaltSync(13);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
      },
      createSecure: function (firstname, lastname, email, pw, error, success) {
        var hash = this.encryptPassword(pw);
        this.create({
          firstName: firstname,
          lastName: lastname,
          email: email,
          password_digest: hash
        })
        .then(function (user) {
          console.log("YES!!")
          success(null, user, {message: "logged in"});
         },
        function (err) {
          console.log("Whatt?")
          console.log(arguments)
          console.log(err)
          error(null, false, {message: "something went wrong"});
        });
      },
      authenticate: function (email, password, done) {
        this.findByEmail(email)
        .then(function (user) {
          if (user.checkPassword(password)) {
            console.log("Confirmed!");
            done(null, user);
          } else {
            console.log("Denied!")
            done(null, false, {message: "oops"});
          }
        },
        function (err) {
            done(err)
        })
      }
    }
  });
  passport.use(new passportLocal.Strategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[pw]',
      passReqToCallback : true
    },
    function (req, email, password, done) {
      console.log("Authenticating");
      user.authenticate(email, password, done);
    }
  ))
  return user;
};

// module.exports = function(sequelize, DataTypes) {
//   var user = sequelize.define("user", {
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password_digest: DataTypes.STRING
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//       }
//     }
//   });

//   return user;
// };
