const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  email: String,
  googleID: String,
  facebookID: String,
  password: String,

  name: {
    type: String,
    required: true
  },

  title: {
    type: String,
    default: 'Freshman'
  },

  noOfGamesPlayed: {
    type: [Number],
    default: 0
  },

  noOfQuestionsPlayed: {
    type: [Number],
    default: 0
  },
});

const validateUser = user => {
  const schema = {
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
    password2: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(user, schema);
}

const validateLogin = user => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(user, schema);
}

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateUser;
exports.validateLogin = validateLogin;