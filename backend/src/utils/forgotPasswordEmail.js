const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const forgotPasswordEmail = async (userId, userEmail) => {
  const resetPasswordToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  const resetPasswordLink = `${process.env.FRONTEND_URL}/auth/reset-password/?token=${resetPasswordToken}`;

  const emailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
    <body style="color: black; font-family: sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <img src="https://res.cloudinary.com/drixoqiw9/image/upload/v1743346456/pq05kusgrg31lqaa3afo.png" alt="Brand Logo" style="max-width: 200px; height: auto;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <h3 style="color: black;">Hello!</h3>
            <p style="color: black;">You are receiving this email because we received a password reset request for your account.</p>

            <!-- Button as a table for better rendering -->
            <table cellspacing="0" cellpadding="0" style="margin: 20px 0;">
              <tr>
                <td align="center" bgcolor="#A4161A" style="border-radius: 5px;">
                  <a href="${resetPasswordLink}" 
                    target="_blank" 
                    style="display: inline-block; padding: 12px 24px; color: white; text-decoration: none; font-weight: bold;">
                    Reset Password
                  </a>
                </td>
              </tr>
            </table>

            <!-- Note -->
            <p style="color: black; margin-top: 20px;">
              <strong>Note:</strong> This code will expire in 10 minutes.
            </p>

            <p style="color: black;">If you did not request a password reset, no further action is required.</p>
            <hr style="margin: 20px 0;" />

            <!-- Fallback URL -->
            <p style="color: black; font-size: 0.9rem;">
              If you're having trouble clicking the "Reset Password" button, copy and paste this URL into your browser: 
            </p>
            <p style="color: blue; font-size: 0.85rem; word-break: break-all; cursor: pointer;">
              ${resetPasswordLink}
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;


  await transporter.sendMail({
    from: `HomeFit ${process.env.GMAIL_ACCOUNT}`,
    to: userEmail,
    subject: "Reset Password",
    html: emailTemplate,
  });
};

module.exports = forgotPasswordEmail;
