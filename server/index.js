const express = require('express');
const socket = require('socket.io');
const session = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
require('./services/passport');

const app = express();

// CONNECT TO MONGODB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Couldn\'t connect to MongoDB...', err));

// COOKIE SESSION MIDDLEWARE
app.use(session({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  secret: keys.cookieSecret
}));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// BODYPARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// CLIENT ROUTE
if (process.env.NODE_ENV === 'producion') {
  app.use(express.static('../client/build/'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));
require('./services/socket')(socket(server));