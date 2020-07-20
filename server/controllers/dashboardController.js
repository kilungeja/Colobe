const Loan = require("../models/Loan");
const User = require("../models/User");
const { sendAdminText, sendEmail, calculateInterest } = require("../helpers");

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
    updatedLoan.interest = getInterest(updatedLoan.amount, updatedLoan.date);
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
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};
const getInterest = (amount, loanDate) => {
  return calculateInterest(amount, days(loanDate), 0.02, 2) - amount;
};
const days = loanDate => {
  return (new Date(loanDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
};

// getting logged user assets
exports.getUserAssets = async (req, res, next) => {
  const { userId } = req;
  try {
    loan = await Promise.all([
      Loan.find({ debitor: userId, loanStatus: "Not paid" }).populate(
        "applicant"
      ),
      Loan.find({ applicant: userId, loanStatus: "Not paid" }).populate(
        "debitor"
      ),
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
      Loan.countDocuments({ debitor: userId, loanStatus: "Not paid" })
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
    updatedLoan.applicant.assets -= updatedLoan.amount + updatedLoan.interest;
    await updatedLoan.applicant.save();
    updatedLoan.debitor.assets +=
      updatedLoan.amount + updatedLoan.interest * 0.7;
    await updatedLoan.debitor.save();
    updatedLoan.verifiedBy = userId;
    updatedLoan.loanStatus = "Not paid";
    updatedLoan = await updatedLoan.save();

    // adding 30% to admin account
    let admin = await User.findById(userId);
    admin.assets += updatedLoan.interest * 0.3;
    await admin.save();
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
    let updatedLoan = await Loan.findById(loanId)
      .populate("applicant")
      .populate("debitor");
    updatedLoan.applicant.assets += updatedLoan.amount + updatedLoan.interest;
    await updatedLoan.applicant.save();
    updatedLoan.debitor.assets -=
      updatedLoan.amount + updatedLoan.interest * 0.7;
    await updatedLoan.debitor.save();
    updatedLoan.loanStatus = "Paid";
    updatedLoan = await updatedLoan.save();
    res.json({ msg: "Verified Paid successflly" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// get loans that have been paid
exports.getPaidLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find({ loanStatus: "Paid" })
      .populate("applicant")
      .populate("debitor")
      .populate("verifiedBy");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getAdminCounts = async (req, res, next) => {
  try {
    const promises = await Promise.all([
      User.countDocuments({ isAdmin: false }),
      User.findById(req.userId),
      Loan.countDocuments({ loanStatus: "pending", debitor: { $ne: null } })
    ]);
    const data = {
      users: promises[0],
      assets: promises[1].assets,
      requests: promises[2]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
