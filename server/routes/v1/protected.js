require("dotenv").config();
const passport = require("passport");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Configure Passport.js JWT strategy (replace with your actual secret)
const jwtSecret = process.env.JWT_SECRET;
const jwtOptions = {
  jwtFromRequest: req => req.headers.authorization && req.headers.authorization.split(' ')[1],
  secretOrKey: jwtSecret,
};

router.get('/protected', passport.authenticate('jwt'), (req, res) => {
  console.log(req.user); // User data will be available here if token is valid

  if (req.user) {
    // User is authenticated, send protected data
    res.json({ message: 'Access granted', user: req.user });
  } else {
    // No valid token found or error during verification, send unauthorized error
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;

module.exports = router;
