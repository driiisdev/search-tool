require("dotenv").config();
const passport = require("passport");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Access granted' });
});

module.exports = router;
