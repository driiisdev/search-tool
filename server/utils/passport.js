require('dotenv').config();
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'), // Extract token from Authorization header
  secretOrKey: process.env.JWT_SECRET, // Use the same JWT secret used for token generation
};

const User = require('../models/user');

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

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId);
      if (user) {
        done(null, user); // Successful authentication with user object
      } else {
        done(null, false); // No user found for the token
      }
    } catch (err) {
      done(err); // Error during user retrieval
    }
  })
);
