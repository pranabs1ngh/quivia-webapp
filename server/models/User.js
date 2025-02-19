const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  email: String,
  googleID: String,
  // facebookID: String,
  password: String,

  name: {
    type: String,
    required: true
  },

  title: {
    type: String,
    default: 'Freshman'
  },

  level: {
    type: Number,
    default: 1
  },

  displayImage: {
    type: String,
    default: 'https://www.primianotucci.com/static/images/avatar-12df3081.png'
  },

  noOfGamesPlayed: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      won: 0,
      lost: 0
    }
  },

  noOfQuestionsPlayed: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      won: 0,
      lost: 0
    }
  },
});

const validateUser = user => {
  const schema = {
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
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