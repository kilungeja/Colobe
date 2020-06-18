const router = require("express").Router();
const { body } = require("express-validator");

const { postLogin, postRegister } = require("../controllers/authController");

router.post("/login", postLogin);
router.post(
  "/register",
  [
    body("firstName", "Firstname field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body("lastName", "Lastname field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email field should not be empty")
      .isEmail()
      .withMessage("E-mail address should be valid")
      .trim()
      .escape(),
    body("username", "Username field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body("regNo", "Registration field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .escape(),
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
