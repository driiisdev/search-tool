require('dotenv').config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/api/v1/auth/facebook/callback',
      proxy: true,
      profileFields: ['id', 'displayName', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Facebook strategy callback invoked!');

      if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
        return done(new Error('No email found in Facebook profile'), null);
      }

      const { id, displayName, emails } = profile;

      try {
        let existingUser = await User.findOne({ facebookId: id });

        if (!existingUser) {
          const newUser = new User({
            name: displayName,
            email: emails[0].value,
            facebookId: id,
          });

          existingUser = await newUser.save();
        } else {
          // Update user record if needed (e.g., name, email)
          existingUser.name = displayName;
          existingUser.email = emails[0].value;

          existingUser = await existingUser.save();
        }

        done(null, existingUser);
      } catch (err) {
        done(err);
      }
    }
  )
);
