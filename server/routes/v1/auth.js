require("dotenv").config();
const passport = require("passport");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require('crypto'); // For generating random token

router.get("/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  if (req.user) {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const authToken = generateRandomToken();
    res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 360000 }); // 6 minute
    res.cookie('authToken', authToken, { httpOnly: true, secure: false, maxAge: 360000 });
    res.redirect('http://localhost:5173/dashboard')
  } else {
    res.status(401).json({ message: 'Facebook authentication failed' });
  }
});

function generateRandomToken() {
  return crypto.randomBytes(32).toString('hex'); // Replace 32 with desired token length
}

module.exports = router;
