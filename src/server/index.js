const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const routerV2 = require('./routes/v2');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// If we are running on heroku, port will be provided as process.env.PORT
const port = process.env.PORT || 3001;

// Add headers
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://localhost:8080',
    'https://redux-music-test.herokuapp.com',
    'https://redux-music.herokuapp.com',
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Simple logger
function logger(req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}

const welcomeMessage =
  'Welcome to SoundCloud API server! For more details go to: https://github.com/MiniPekka/redux-music-api';

app.get('/', (req, res) => {
  res.send(welcomeMessage);
});

app.use(logger);
app.use('/', routerV2);

app.listen(port, () => {
  console.log(`API Server Started at:${port}`);
  console.log(`API server is running in ${process.env.NODE_ENV} mode`);
});
