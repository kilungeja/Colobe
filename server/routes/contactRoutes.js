const router = require("express").Router();
const { body } = require("express-validator");

const { isAuth } = require("../middlewares/authMiddleware");

const { postContact, getContact } = require("../controllers/contactController");

router.post(
  "/",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email field should not be empty")
      .isEmail()
      .withMessage("E-mail address should be valid")
      .trim(),
    body("phone", "Phone number field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body("message", "Lastname field should not be empty")
      .not()
      .isEmpty()
      .trim()
      .escape()
  ],
  postContact
);

router.get("/", isAuth, getContact);

module.exports = router;
