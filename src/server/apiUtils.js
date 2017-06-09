'use strict';

const { HOST_SC_V2 } = require('./consts');

function getSCV2FetchUrl(url) {
  return `${HOST_SC_V2}${url}`;
}

// Return a promise
function onResponseSuccess(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

// Simple wrapper of fetch
// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function makeRequest(fetchUrl) {
  return fetch(fetchUrl).then(onResponseSuccess);
}

module.exports = {
  getSCV2FetchUrl,
  makeRequest,
};
