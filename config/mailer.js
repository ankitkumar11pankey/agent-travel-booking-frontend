const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL, 
    pass: process.env.SMTP_PASS,  
  },
});

const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Ticket Booking" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Mail error:", error);
  }
};

module.exports = { sendMail };
