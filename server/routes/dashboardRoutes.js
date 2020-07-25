const {
  postLoan,
  getLoans,
  getLoan,
  getUserPendingLoan,
  deleteLoan,
  updateLoan,
  confirmLending,
  getVerified,
  postVerified,
  getPostVerified,
  postPostVerified,
  getUserCreditors,
  getUserCreditorDetails,
  getUserAssets,
  getUserCounts,
  getPaidLoans,
  getAdminCounts,
  getPieData
} = require("../controllers/dashboardController");

const router = require("express").Router();
router.get("/userhome-counts", getUserCounts);
router.post("/loan", postLoan);
router.get("/loan/:loanId", getLoan);
router.get("/loans", getLoans);
router.get("/loan", getUserPendingLoan);
router.get("/assets", getUserAssets);
router.patch("/loan", updateLoan);
router.delete("/loan/:id", deleteLoan);
router.get("/confirm/:id", confirmLending);
router.get("/creditors", getUserCreditors);
router.get("/creditors/:creditorId/:loanId", getUserCreditorDetails);

router.get("/pieData", getPieData);
// admin requests
router.get("/verified", getVerified);
router.get("/verified/:loanId", postVerified);
router.get("/post-verified", getPostVerified);
router.get("/post-verified/:loanId", postPostVerified);
router.get("/paid-loans", getPaidLoans);
router.get("/adminhome-counts", getAdminCounts);

module.exports = router;
