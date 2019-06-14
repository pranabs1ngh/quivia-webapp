const { User, validate } = require('../models/User');
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const router = express.Router();

// REGISTER USER
router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;

  // Check for errors in form entry
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  else if (password !== password2) return res.status(400).send('Passwords don\'t match.');

  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({ name, email, password });

  // HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send('User Registered');
});

// LOGIN USER
router.get('/login', (req, res) => {
  res.send(req.session);
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login',
  failureFlash: true
}));

// LOGOUT USER
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/user/login');
});

module.exports = router;