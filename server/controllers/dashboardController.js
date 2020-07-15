const nodemailer = require("nodemailer");

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  {
    lazyLoading: true
  }
);

const Loan = require("../models/Loan");
const User = require("../models/User");
exports.postLoan = async (req, res, next) => {
  const date = new Date(req.body.date);
  const { userId } = req;
  const amount = req.body.amount;
  const loan = await Loan.findOne({
    applicant: userId
  });
  if (loan) {
    const { loanStatus } = loan;
    if (loanStatus === "not paid") {
      return res.json({
        msg: "Please make sure your previous loan is paid first"
      });
    }
    if (loanStatus == "pending") {
      return res.json({
        msg: "You have a pending request already: Delete it to apply again"
      });
    }
  }
  new Loan({ date, amount, applicant: userId })
    .save()
    .then(loan => {
      res.json({ msg: "Loan applied successful" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "Server error" });
    });
};

exports.getLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find({ debitor: null }).populate("applicant");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getLoan = async (req, res, next) => {
  const { loanId } = req.params;
  try {
    const loan = await Loan.findById(loanId).populate("applicant");
    res.json(loan);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUserPendingLoan = async (req, res, next) => {
  const { userId } = req;
  try {
    const userLoan = await Loan.findOne({
      applicant: userId,
      loanStatus: "pending"
    });
    res.json(userLoan);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateLoan = async (req, res, next) => {
  const { amount, date, loanId } = req.body;
  try {
    updatedLoan = await Loan.findByIdAndUpdate(loanId, {
      amount,
      date: new Date(date)
    });
    res.json({ msg: "Updated successfull" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
exports.deleteLoan = async (req, res, next) => {
  const { id } = req.params;

  try {
    let deletedLoan = await Loan.findByIdAndDelete(id);
    res.json({ msg: "Deleted successfull" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.confirmLending = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    let updatedLoan = await Loan.findById(id).populate("applicant");
    updatedLoan.debitor = userId;
    updatedLoan = await updatedLoan.save();
    const { email } = updatedLoan.applicant;

    // sending email to loan applicant
    sendEmail(
      email,
      "Loan confirmation",
      "Your loan application has been granted, Reach out to admin to confirm it."
    );
    res.json({ msg: "Confirmed successflly" });

    // sending sms to admin to confirm the transaction
    sendAdminText();
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// getting logged user assets
exports.getUserAssets = async (req, res, next) => {
  const { userId } = req;
  try {
    loan = await Promise.all([
      Loan.find({ debitor: userId }).populate("applicant"),
      Loan.find({ applicant: userId }).populate("debitor"),
      User.findById(userId)
    ]);
    const creditors = loan[0];
    const debitors = loan[1];
    const user = loan[2];
    const data = {
      total: user.assets,
      assets: creditors,
      liabilities: debitors
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUserCounts = async (req, res, next) => {
  const { userId } = req;
  try {
    const promises = await Promise.all([
      User.findById(userId),
      Loan.countDocuments({ loanStatus: "pending" }),
      Loan.countDocuments({ debitor: userId })
    ]);
    const data = {
      applicants: promises[1],
      assets: promises[0].assets,
      creditors: promises[2]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const sendAdminText = () => {
  client.messages
    .create({
      body: "Login to verify a loan !",
      from: process.env.TWILIO_NO,
      to: process.env.ADMIN_NO
    })
    .then()
    .catch(err => console.log(err));
};

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAL,
      pass: process.env.E_PWD
    }
  });

  const options = {
    from: "colobe.email.com",
    to,
    subject,
    text
  };

  try {
    const res = await transporter.sendMail(options);
    return res;
  } catch (error) {
    console.log(error);
  }
};

exports.getUserCreditors = async (req, res, next) => {
  const { userId } = req;
  try {
    const loans = await Loan.find({
      debitor: userId,
      loanStatus: "Not paid"
    }).populate("applicant");

    res.json(loans);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
exports.getUserCreditorDetails = async (req, res, next) => {
  const { userId } = req;
  const { creditorId, loanId } = req.params;
  try {
    const loan = await Loan.findOne({
      _id: loanId,
      debitor: userId,
      applicant: creditorId
    }).populate("applicant");
    res.json(loan);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// admin requests

// get al loans that are confirmed by debtors
exports.getVerified = async (req, res, next) => {
  try {
    const loans = await Loan.find({ verifiedBy: null, debitor: { $ne: null } })
      .populate("applicant")
      .populate("debitor");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// admin or staff verifies a loan
exports.postVerified = async (req, res, next) => {
  const { loanId } = req.params;

  const { userId } = req;
  try {
    let updatedLoan = await Loan.findById(loanId)
      .populate("applicant")
      .populate("debitor");
    updatedLoan.applicant.assets -= updatedLoan.amount;
    await updatedLoan.applicant.save();
    updatedLoan.debitor.assets += updatedLoan.amount;
    await updatedLoan.debitor.save();
    updatedLoan.verifiedBy = userId;
    updatedLoan.loanStatus = "Not paid";
    updatedLoan = await updatedLoan.save();
    console.log(updatedLoan);
    res.json({ msg: "Verified successflly" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// alredy verified loans
exports.getPostVerified = async (req, res, next) => {
  const { userId } = req;
  try {
    const loans = await Loan.find({ loanStatus: "Not paid" })
      .populate("applicant")
      .populate("debitor")
      .populate("verifiedBy");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update (paid)  verified loans after a creditor has paid
exports.postPostVerified = async (req, res, next) => {
  const { loanId } = req.params;

  const { userId } = req;
  try {
    let updatedLoan = await Loan.findById(loanId);
    updatedLoan.loanStatus = "Paid";
    updatedLoan = await updatedLoan.save();
    res.json({ msg: "Verified Paid successflly" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
