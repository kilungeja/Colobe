const { validationResult } = require("express-validator");

const Contact = require("../models/Contact");

exports.postContact = async (req, res, next) => {
  let err = validationResult(req);
  let errors = err.array();
  if (!err.isEmpty()) {
    return res.status(422).json({ msg: "Validation error", errors });
  }
  try {
    const contact = new Contact({ ...req.body });
    await contact.save();
    res.json({
      msg:
        "Your contact was sent successfully, Admin will get back to you shortly"
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
exports.getContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
