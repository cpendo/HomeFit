const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateVerifyToken = (id) => {
  return jwt.sign({ user_id: id }, JWT_SECRET, { expiresIn: "10m" });
};

module.exports = generateVerifyToken;
