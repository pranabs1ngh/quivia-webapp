const express = require('express');
const session = require('cookie-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
require('./config/passport');

const app = express();

// CONNECT TO MONGODB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Couldn\'t connect to MongoDB...', err));

// EXPRESS SESSION MIDDLEWARE
app.use(session({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  secret: keys.cookieSecret
}));

// FLASH MIDDLEWARE
app.use(flash());

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// BODYPARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
app.get('/', require('./routes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));