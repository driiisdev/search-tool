require("dotenv").config();
const passport = require("passport");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  if (req.user) {
    console.log('got here');
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('got token');
    // Set token in Authorization header with 'Bearer' prefix
    res.setHeader('Authorization', `Bearer ${token}`);
    // const redirectUrl = `http://localhost:5173/dashboard?token=${token}`; // Add token to redirect URL
    res.cookie('jwtToken', token, { httpOnly: true, secure: false }); // Secure cookie
    res.redirect('http://localhost:5173/dashboard'); // Redirect to the frontend with token
    console.log(req.user);
  } else {
    res.status(401).json({ message: 'Facebook authentication failed' });
  }
});

module.exports = router;
