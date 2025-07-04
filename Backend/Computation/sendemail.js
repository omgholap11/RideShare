const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iomgholap123@gmail.com",
    pass: "sfiyugaaekhkqzsd"
  }
});

const mailOptions = {
  from: "iomgholap123@gmail.com",
  to: "gholaprohit75@gmail.com",
  subject: "Ride Confirmation",
  text: "Kasa ahes bhos****!!!"
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.log(err);
  else console.log("Email sent: " + info.response);
});
