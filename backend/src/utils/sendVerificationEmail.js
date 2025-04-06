const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async ( userEmail, userName,PIN) => {
 
  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <body style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; width: 100vw;">
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0; padding: 0; width: 500px; margin: 0 auto;">
      <div>
        <img src="https://res.cloudinary.com/drixoqiw9/image/upload/v1743346456/pq05kusgrg31lqaa3afo.png"
          alt="Brand Logo">
        </div>
        <h3>You're Almost There ${userName}!</h3>
        <p style="text-align: center;">Before you finish creating your account, we need to verify your identity. On the
            verification page, enter the following code.</p>
        <p style="font-size: 2rem; font-weight: 700;">${PIN}</p>
        <p style="font-style: italic; font-size: 1rem;">This code will expire in 60 minutes.</p>
    </div>
  </body>
  </html>`;

  await transporter.sendMail({
    from: `HomeFit ${process.env.GMAIL_ACCOUNT}`,
    to: userEmail,
    subject: "Activate Your Account",
    html: emailTemplate,
  });
};

module.exports = sendVerificationEmail;
