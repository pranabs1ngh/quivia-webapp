const express = require('express');
const socket = require('socket.io');
const session = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const cors = require('cors');
require('./services/passport');

const app = express();
app.set('trust proxy', 1);

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['set-cookie']
};

// Apply the CORS middleware globally
app.use(cors(corsOptions));


// CONNECT TO MONGODB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Couldn\'t connect to MongoDB...', err));

// COOKIE SESSION MIDDLEWARE
app.use(session({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  secret: keys.cookieSecret,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
  domain: keys.appURL,
  httpOnly: true,
}));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// BODYPARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
app.use('/api/check', require('./routes/check'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// CLIENT ROUTE
// if (process.env.NODE_ENV === 'production') {
//   const root = require('path').join(__dirname, '..', 'client', 'build');

//   app.use(express.static(root));
//   app.get('*', (req, res) => {
//     res.sendFile('index.html', { root });
//   });
// };

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));
require('./services/socket')(socket(server, { origins: '*' }));