const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email'],
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    console.log(req.user);
    if (req.user) {
        res.json({
            facebookId: req.user.facebookId,
            email: req.user.email,
            name: req.user.name
        });
    } else {
        res.status(401).json({ message: 'Facebook authentication failed' });
    }
});

module.exports = router;
