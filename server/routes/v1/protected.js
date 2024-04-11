require("dotenv").config();
const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get('/protected', passport.authenticate('jwt', (err, user, info) => {
  if (err || !user) {
    // Handle error or unauthorized access (e.g., redirect)
    return res.status(401).json({ message: 'Unauthorized' }); // Or redirect here
  }

  console.log('got here'); // This will be logged if authorized
  res.json({ message: 'Access granted', user: user });
}));

module.exports = router;
