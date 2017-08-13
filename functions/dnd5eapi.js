const functions = require('firebase-functions');
const request = require('request');

const dnd5eapi = functions.https.onRequest((req, res) => {
  request(`http://www.dnd5eapi.co/${req.query.path}`).pipe(res);
});

exports.default = dnd5eapi;
