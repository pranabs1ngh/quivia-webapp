const express = require('express');
const passport = require('passport');

const router = express.Router();

// GOOGLE AUTH ROUTES
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}));

// FACEBOOK AUTH ROUTES
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}));


module.exports = router;