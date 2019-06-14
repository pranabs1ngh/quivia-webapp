const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const keys = require('./keys');

// Load User Model
const { User, validateLogin } = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
  const { error } = validateLogin({ email, password });
  if (error) return done(null, false, { message: error.details[0].message });

  const user = await User.findOne({ email });
  if (!user) return done(null, false, { message: 'Email not registered.' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return done(null, false, { message: 'Invalid email or password.' });

  return done(null, user);
}));

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.gooogleClientSecret,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleID: profile.id });
  if (user) { done(null, user); }
  else {
    user = new User({
      name: profile.displayName,
      googleID: profile.id,
    });
    user = await user.save();
    done(null, user);
  }
}));