require("dotenv").config();
const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get('/protected', passport.authenticate('jwt', (err, user, info) => {
  if (err || !user) {
    // Handle error or unauthorized access (e.g., redirect)
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.json({ message: 'Access granted', user: user });
}));

router.get('/get-tokens', (req, res) => {
  // Assuming tokens are stored in httpOnly cookies
  const { token, authToken } = req.cookies;
  const user = req.user

  // Validate the tokens or session
  if (!token || !authToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Return tokens in JSON response
  res.json({ token, authToken, user });
});

module.exports = router;
