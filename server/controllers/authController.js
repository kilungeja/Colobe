const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

exports.postLogin = (req, res, next) => {
  res.send("hi there");
};
exports.postRegister = (req, res, next) => {
  let err = validationResult(req);
  let errors = err.array();
  if (!err.isEmpty()) {
    return res.status(422).json({ msg: "Validation error", errors });
  }

  const {
    firstName,
    lastName,
    username,
    email,
    regNo,
    phone,
    password
  } = req.body;
  bcrypt
    .genSalt(10)
    .then(salt => {
      return salt;
    })
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hashedPassword => {
      new User({
        firstname: firstName,
        lastname: lastName,
        username: username,
        email: email,
        phone: phone,
        reg_no: regNo,
        password: hashedPassword
      })
        .save()
        .then(user => {
          res.json({ msg: "Registered successfully and can now login" });
          console.log(user);
        })
        .catch(err => {
          res.status(500).json({ msg: "Server error" });
          console.log(err);
        });
    })
    .catch(err => {
      res.status(500).json({ msg: "Server error" });
      console.log(err);
    });
};
