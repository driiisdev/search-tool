require('dotenv').config();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email']
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookId: profile.id }, (err, existingUser) => {
    if (err) { return done(err); }
    if (!existingUser) {
      const newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        facebookId: profile.id
      });
      newUser.save((err) => {
        if (err) { done(err, null); } else {
          return done(null, newUser);
        }
      });
    } else {
      return done(null, existingUser);
    }
  });
}));
