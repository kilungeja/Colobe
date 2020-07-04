const { postLoan, getLoans } = require("../controllers/dashboardController");

const router = require("express").Router();

router.post("/loan", postLoan);
router.get("/loans", getLoans);

module.exports = router;
