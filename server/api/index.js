// This is the API Server that talks to SoundCloud.
var express = require('express');
var bodyParser = require('body-parser');
var v1 = require('./routes/v1');
import v2 from './routes/v2';
// import fetch from 'isomorphic-fetch';
import fetch from 'node-fetch';
import axios from 'axios';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// If we are running on heroku, port will be provided as process.env.PORT
const port = process.env.PORT || 3001;

// const allowAccess = 'https://redux-music.herokuapp.com';

// Add headers
app.use((req, res, next) => {
    // http://stackoverflow.com/questions/24897801/enable-access-control-allow-origin-for-multiple-domains-in-nodejs
    // Website you wish to allow to connect
    var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://redux-music-test.herokuapp.com', 'https://redux-music.herokuapp.com'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

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

app.listen(port, () => {
    console.log(`API Server Started at:${port}`);
    console.log(`API server is running in ${process.env.NODE_ENV} mode`);
});
