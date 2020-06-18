const { validationResult } = require("express-validator");

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
    password,
    password2
  } = req.body;
  res.json({ msg: "Registered" });
};
