// This is the API Server that talks to SoundCloud.
var express = require('express');
var bodyParser = require('body-parser');
var v1 = require('./routes/v1');
var v2 = require('./routes/v2');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// If we are running on heroku, port will be provided as process.env.PORT
const port = process.env.PORT || 3001;

// const allowAccess = 'https://redux-music.herokuapp.com';
const allowAccess = 'https://redux-music-test.herokuapp.com';
// const allowAccess = 'http://localhost';

// Add headers
app.use((req, res, next) => {
   // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', allowAccess);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Simple logger
function logger(req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(logger);

app.use('/sc/api-v1', v1);
app.use('/sc/api-v2', v2);

app.get('/', function (req, res) {
    res.send('Welcome to api server for redux-music!');
});

app.listen(port, () => {
  console.log(`API Server Started at:${port}`);
});
