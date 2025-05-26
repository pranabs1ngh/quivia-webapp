const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');

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
  callbackURL: `${keys.appURL}/api/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleID: profile.id });
  if (user) { done(null, user); }
  else {
    user = new User({
      name: profile.displayName,
      displayImage: profile.photos[0].value,
      googleID: profile.id
    });
    user = await user.save();
    done(null, user);
  }
}));

// passport.use(new FacebookStrategy({
//   clientID: keys.facebookClientID,
//   clientSecret: keys.facebookClientSecret,
//   callbackURL: `/api/auth/facebook/callback`,
//   profileFields: ['name', 'emails', 'picture.type(large)']
// }, async (accessToken, refreshToken, profile, done) => {
//   let user = await User.findOne({ facebookID: profile.id });
//   if (user) { done(null, user); }
//   else {
//     console.log(profile);
//     user = new User({
//       name: profile.name.givenName.concat(' ', profile.name.familyName),
//       displayImage: profile.photos[0].value,
//       facebookID: profile.id
//     });
//     user = await user.save();
//     done(null, user);
//   }
// }));