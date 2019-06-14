const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

// Load User Model
const { User, validateLogin } = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
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