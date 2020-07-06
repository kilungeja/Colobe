const {
  postLoan,
  getLoans,
  getLoan,
  getUserPendingLoan
} = require("../controllers/dashboardController");

const router = require("express").Router();

router.post("/loan", postLoan);
router.get("/loan/:loanId", getLoan);
router.get("/loans", getLoans);
router.get("/loan", getUserPendingLoan);

module.exports = router;
