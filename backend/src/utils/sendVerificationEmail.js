const nodemailer = require("nodemailer");

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
    <body style="color: black;">
      <div>
        <img src="https://res.cloudinary.com/drixoqiw9/image/upload/v1743346456/pq05kusgrg31lqaa3afo.png"
          alt="Brand Logo">
        </div>
        <h3 style="color: black;">You're almost there ${userName}!</h3>
        <p style="color: black;">Before you finish creating your account, we need to verify your identity. <br> On the
            verification page, enter the following code.</p>
        <p style="font-size: 1.5rem; font-weight: 700; margin: 0; padding: 0; color: black;">${PIN}</p>
        <p style="color: black;"> <span style="font-weight:700">Note: </span>This code will expire in 60 minutes.</p>
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
