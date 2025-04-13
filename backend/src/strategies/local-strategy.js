const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateVerifyToken = require("../utils/generateVerifyToken");


passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) return done(null, false, { message: "User not found" });

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword)
          return done(null, false, { message: "Invalid Credentials" });

        if (!user.is_verified) {
          const jwtToken = generateVerifyToken(user.id);
          return done(null, false, {
            message: "Account not verified",
            token: jwtToken,
          });
        }
       
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return done(null, false, { message: "User not found" });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
