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
  const loans = await Loan.find();
  res.json(loans);
};
