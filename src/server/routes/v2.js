const express = require('express');
const { getSCV2FetchUrl } = require('../apiUtils');

const router = express.Router();

// The request to this endpoint looks like this:
// https://localhost:3001/charts?kind=top&genre=soundcloud:genres:disco&client_id=xxxxxx&limit=20&offset=0&linked_partitioning=1
router.get('/charts', (request, response) => {
  const scUrl = getSCV2FetchUrl(request.url);
  // Simply return whatever returned by soundcloud
  // console.log(scUrl);
  fetch(scUrl)
    .then(res => {
      if (res.ok) return res.json();
      response.status(res.status).send(res.statusText);
    })
    .then(json => {
      response.json(json);
    })
    .catch(err => {
      console.log('Error:', err);
      response.status(500).send('Can not reach SoundCloud Server');
    });
});

// http://localhost:3001/tracks/325151710?client_id=f9e1e2232182a46705c880554a1011af
router.get('/tracks/:trackId', (request, response) => {
  const scUrl = getSCV2FetchUrl(request.url);
  fetch(scUrl)
    .then(res => {
      if (res.ok) return res.json();
      console.log(res);
      response.status(res.status).send(res.statusText);
    })
    .then(json => {
      response.json(json);
    })
    .catch(err => {
      console.log('Error: ', err);
      response.status(500).send('Can not reach SoundCloud Server');
    });
});

router.get('/tracks/:trackId/waveform', (request, response) => {
  const scUrl = getSCV2FetchUrl(request.url);
  fetch(scUrl)
    .then(res => {
      if (res.ok) return res.json();
      console.log(res);
      response.status(res.status).send(res.statusText);
    })
    .then(json => {
      json.waveform_url
      response.json(json);
    })
    .catch(err => {
      console.log('Error: ', err);
      response.status(500).send('Can not reach SoundCloud Server');
    });
});

module.exports = router;
