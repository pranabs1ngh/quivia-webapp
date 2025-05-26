const express = require('express');
const passport = require('passport');
const keys = require('../config/keys');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: keys.appURL,
  failureRedirect: `${keys.appURL}/user`
}));

// router.get('/facebook', passport.authenticate('facebook'));

// router.get('/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: '/',
//   failureRedirect: '/user'
// }));

module.exports = router;