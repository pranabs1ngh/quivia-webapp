const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { User, validate } = require('../models/User');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.user) {
    const { name, title, level, displayImage, noOfGamesPlayed, noOfQuestionsPlayed } = req.user;
    res.send({ name, title, level, displayImage, noOfGamesPlayed, noOfQuestionsPlayed });
  } else res.send(null);
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message.replace(/"/g, ''));

  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // CREATE SESSION
  req.login(user, err => { if (err) return res.status(400).send(err) });
  res.send({ auth: true });
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(400).send(error);
    if (!user) return res.status(400).send(info.message);

    // CREATE SESSION
    req.login(user, err => { if (err) return res.status(400).send(err) });
    res.send({ auth: true });
  })(req, res, next)
});

router.get('/signout', (req, res) => {
  req.logOut();
  res.send({ auth: false });
});

module.exports = router;