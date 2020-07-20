const nodemailer = require("nodemailer");

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  {
    lazyLoading: true
  }
);
exports.sendAdminText = () => {
  client.messages
    .create({
      body: "Login to verify a loan !",
      from: process.env.TWILIO_NO,
      to: process.env.ADMIN_NO
    })
    .then()
    .catch(err => console.log(err));
};

exports.calculateInterest = (amount, days, interest, roundToPlaces) => {
  var total = amount;
  for (var i = 1; i <= days; i++) {
    var percent = total * interest;
    total += percent;
  }
  return total.toFixed(roundToPlaces);
};

exports.sendEmail = async (to, subject, text) => {
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
