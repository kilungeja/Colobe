const router = require("express").Router();
const { body } = require("express-validator");

const User = require("../models/User");

const { postLogin, postRegister } = require("../controllers/authController");

router.post(
  "/login",
  [
    body("password", "Password field should not be empty")
      .not()
      .isEmpty(),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email field should not be empty")
      .isEmail()
      .withMessage("E-mail address should be valid")
      .trim()
  ],
  postLogin
);
router.post(
  "/register",
  [
    body("firstName", "Firstname field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .matches("^[A-Za-z]+$")
      .withMessage("Firstname should be a valid string")
      .escape(),
    body("lastName", "Lastname field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .matches("^[A-Za-z]+$")
      .withMessage("Lastname should be a valid string")
      .escape(),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email field should not be empty")
      .isEmail()
      .withMessage("E-mail address should be valid")
      .custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email exists already");
        }
      })
      .trim()
      .escape(),
    body("username", "Username field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .custom(async value => {
        const user = await User.findOne({ username: value });
        if (user) {
          throw new Error("Username already in use");
        }
      }),
    body("regNo")
      .not()
      .isEmpty()
      .withMessage("Registration field should not be empty")
      .matches("[0-9]{8}/T.[0-9]{2}")
      .withMessage("Registration number must be valid")
      .trim()
      .custom(async value => {
        let user = null;
        user = await User.findOne({ reg_no: value });

        if (user) {
          throw new Error("Registration number already in use");
        }
      }),
    body("phone", "Phone number field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body("password", "Password field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body("password2")
      .not()
      .isEmpty()
      .withMessage("Confirm password field should not be empty")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords must match");
        }

        return true;
      })
      .trim()
      .escape()
  ],
  postRegister
);

module.exports = router;
