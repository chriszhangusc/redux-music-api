import qs from 'querystring';
import { constructFetchUrl, makeRequest } from './apiUtils';
import { SC_API_V2 } from '../constants/consts.js';


// Error first callbacks are what nodejs use, to see more error handling go to: https://gist.github.com/MiniPekka/4f835e553da331ad2b67659c9271630f

// #TODO: More professional error handling in NodeJs
export async function fetchCharts(genre, clientId, limit, offset, callback) {
    // Should we validate callback?
    try {
        const chartsFromSC = await fetchChartsFromSC(genre, clientId, limit, offset);
        callback(null, transformCharts(chartsFromSC));
    } catch (err) {
        console.log(err);
        callback(new Error('500: Interval Error'));
    }
}

function fetchChartsFromSC(genre, clientId, limit = 20, offset = 0) {
    const endpoint = 'charts';
    // Initial fetching queryParams
    const queryParams = {
        kind: 'top',
        genre: `soundcloud:genres:${genre}`,
        linked_partitioning: 1,
        limit,
        offset,
        client_id: clientId
    };

    const fetchUrl = constructFetchUrl(SC_API_V2, endpoint, queryParams);

console.log('fetchCharts:', fetchUrl);

    return makeRequest(fetchUrl);
}


// Convert Track object from V2 to V1. (SoundCloud keeps two different versions of Track object from their two versions of apis)
function convertTrackToV1(trackV2) {
    return Object.assign({}, trackV2, {
        stream_url: `${trackV2.uri}/stream`,
        favoritings_count: trackV2.likes_count
    });
}

// Transform raw charts returned by SC to make it easier to use in our app.
function transformCharts(chartsSC) {
    // Take the charts result and transform it to what we can use.
    const { collection, next_href } = chartsSC;
    const nextOffset = qs.parse(next_href).offset;

    const resJson = {
        collection: [],
        nextOffset
    };

    if (collection) {
        collection.forEach((item) => {
            const { track } = item;
            resJson.collection.push(convertTrackToV1(track));
        });
    }
    return resJson;
}

// We need to handle all possible response including errors like clientid not autherized
