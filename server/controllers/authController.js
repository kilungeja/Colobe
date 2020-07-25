const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.postLogin = async (req, res, next) => {
  let err = validationResult(req);
  let errors = err.array();
  if (!err.isEmpty()) {
    return res.status(422).json({ msg: "Validation error", errors });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Wrong username or password" });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ msg: "Wrong username or password" });
    }
    const data = {
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin
    };
    const token = jwt.sign(
      {
        data
      },
      "superlongsecretword",
      { expiresIn: "1h" }
    );

    res.json({ msg: "Successfully logged in", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
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
        firstname: firstName.toLowerCase(),
        lastname: lastName.toLowerCase(),
        username: username.toLowerCase(),
        email: email,
        phone: phone,
        reg_no: regNo,
        password: hashedPassword
      })
        .save()
        .then(user => {
          res.json({ msg: "Registered successfully and can now login" });
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

exports.getLoggedInUser = async (req, res, next) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateUser = async (req, res, next) => {
  let err = validationResult(req);
  let errors = err.array();
  if (!err.isEmpty()) {
    return res.status(422).json({ msg: "Validation error", errors });
  }
  const { userId } = req;
  try {
    await User.findByIdAndUpdate(userId, req.body);
    res.json({ msg: "Your information is updated successully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
