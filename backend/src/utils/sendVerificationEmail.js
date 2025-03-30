const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (userID, userEmail, userName) => {
  const verificationToken = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // const verificationLink = `http://localhost:5000/api/users/verify/${verificationToken}`
  const verificationLink = `http://localhost:5173/login/${verificationToken}`;

  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
        <body style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
        <div>
            <img src="https://res.cloudinary.com/drixoqiw9/image/upload/v1743346456/pq05kusgrg31lqaa3afo.png"
            alt="Brand Logo">
        </div>
        <h3 style="">You're Almost There ${userName}!</h3>
        <p style="margin-bottom: 20px;">Please verify your email to activate your account.</p>
        <a href="${verificationLink}"
            style="background:#A4161A;padding:10px 20px;color:white;text-decoration:none;border-radius:5px;margin-bottom:10px;">Activate My
            Account</a>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `HomeFit ${process.env.GMAIL_ACCOUNT}`,
    to: userEmail,
    subject: "Activate Your Account",
    html: emailTemplate,
  });
};

module.exports = sendVerificationEmail;
