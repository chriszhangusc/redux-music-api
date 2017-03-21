import express from 'express';
import { fetchCharts } from '../sc/v2';

const router = express.Router();



// Endpoints
// The request looks like this:
// http://localhost:3001/sc/api-v2/charts?genre=all-music&limit=20&offset=0&client_id=f9e1e2232182a46705c880554a1011af
router.get('/charts', async (req, res) => {
    const genre = req.query.genre;
    const limit = req.query.limit;
    const offset = req.query.offset;
    const clientId = req.query.client_id;

    fetchCharts(genre, clientId, limit, offset, (err, data) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json(data);
        }
    });
});




export default router;
// module.exports = router;
