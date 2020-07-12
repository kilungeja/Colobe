const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loanSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    applicant: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    loanStatus: {
      type: String,
      default: "pending"
    },
    debitor: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    verifiedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },

    confirmedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
