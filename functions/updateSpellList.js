const admin = require('firebase-admin');
const functions = require('firebase-functions');
const request = require('request');

admin.initializeApp(functions.config().firebase);
const database = admin.database();
const savedSpells = [];
const saveSpellToDatabase = url => (
  new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      try {
        const spell = JSON.parse(body);
        /* eslint-disable no-underscore-dangle */
        if (spell && spell._id) {
          spell.id = spell._id;
          delete spell._id;
          database.ref(`dnd/casting/spells/${spell.id}`).set(spell).then(() => {
            resolve(spell);
          }).catch((err) => {
            reject({
              err,
              spell,
            });
          });
        }
        /* eslint-enable no-underscore-dangle */
      } catch (e) {
        reject({
          error,
          body,
        });
      }
    });
  })
);

const saveSpellsToDatabase = (spellLinks, index) => {
  if (index < spellLinks.length) {
    saveSpellToDatabase(spellLinks[index]).then((spell) => {
      savedSpells.push(spell);
      saveSpellsToDatabase(spellLinks, index + 1);
    });
  }
};

const updateSpellList = functions.https.onRequest((req, res) => {
  request('http://www.dnd5eapi.co/api/spells', (error, response, body) => {
    try {
      const parsedBody = JSON.parse(body);
      if (parsedBody && parsedBody.results) {
        const spellLinks = parsedBody.results.map(spell => (spell.url));
        saveSpellsToDatabase(spellLinks, 0);
        res.send(savedSpells);
      } else {
        res.send({
          error,
          response,
          body,
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Spell list parse failed', error, body);
    }
  });
});

exports.default = updateSpellList;
