import express from 'express';
import { fetchCharts } from '../sc/v2';

const router = express.Router();

const SC_V2_HOST = 'https://api-v2.soundcloud.com';

// Endpoints
// The request to this endpoint looks like this:
// http://localhost:3001/charts?genre=all-music&limit=20&offset=0&client_id=f9e1e2232182a46705c880554a1011af
router.get('/charts', async (req, res) => {
  const scUrl = `${SC_V2_HOST}${req.url}`;
  // Simply return whatever returned by soundcloud
  console.log(scUrl);
  fetch(scUrl)
    .then(res => res.json())
    .then(json => {
      console.log('nextHref:', json.next_href);
      res.json(json);
    })
    .catch(err => {
      console.log(err);
      res.json({ error: err.message });
    });
  //   const query = req.query;
  // console.log(query);
  //   const genre = query.genre;
  //   const limit = query.limit;
  //   const clientId = query.client_id;
  //   fetchCharts(genre, clientId, limit, (err, data) => {
  //     if (err) {
  //       res.json({ error: err.message });
  //     } else {
  //       res.json(data);
  //     }
  //   });
});

export default router;
