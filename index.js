const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const keys = require('./config/keys');

const app = express();
require('./config/passport');

// CONNECT TO MONGODB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Couldn\'t connect to MongoDB...', err));

// EXPRESS SESSION MIDDLEWARE
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
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
app.get('/', (req, res) => { res.send(req.session) });
app.use('/user', require('./routes/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));