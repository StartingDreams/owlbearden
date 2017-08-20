const functions = require('firebase-functions');
const request = require('request');

const dnd5eapi = functions.https.onRequest((req, res) => {
  if (req.query.accessKey !== 'obd-fdsa65gbfd43-nkmiz') {
    res.status(500).send('Action not allowed.');
  }
  request(req.query.site).pipe(res);
});

exports.default = dnd5eapi;
