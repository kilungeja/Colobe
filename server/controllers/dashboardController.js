const Loan = require("../models/Loan");

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
    const loans = await Loan.find().populate("applicant");
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
    const userLoan = await Loan.findOne({ applicant: userId });
    res.json(userLoan);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
