const express = require('express');
const request = require('request');
const router = express.Router();
const createError = require('http-errors');
const Flashcard = require('../models/flashcard'); // not used here

let title = '';
let translations;
let language = 'depl';

router.get('/:language', function (req, res) {
  language = req.params.language;
  res.json({ language: req.params.language });
});

router.post('/', function (req, res, next) {
  const options = { // you are defining this object by each post
    url: `https://api.pons.com/v1/dictionary?q=${req.body.title}&l=${language}`, // from config file this part https://api.pons.com/v1
    headers: {
      'X-Secret': process.env.SECRET_KEY // config.js , // from config file THIS KEY IS IN PUBLIC REPO !!!
    },
  };
  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      let newInfo = data.map((obj) => { // cos takiego map zawsze cos zwraca tablice nowa
        if (obj.lang === 'pl') {
          newInfo = newInfo.concat(obj.hits); // you are doing here exactly the same what in line 31
        } else if (obj.lang === 'es' || 'de' || 'ru' || 'en') {
          newInfo = newInfo.concat(obj.hits);
        }
      });

      if (!newInfo) {
        next(createError(404));
        return;
      }

      newInfo.map((obj) => {
        if (obj.type === 'entry') {
          title = newInfo[0].roms[0].headword;
          translations = newInfo[0].roms[0].arabs[0].translations;
        } else if (obj.type === 'translation') {
          title = req.body.title;
          translations = newInfo;
        }
      });

      return res.json({ title, translations });
    } else {
      next(createError(404));
    }
  }
  request(options, callback);
});

module.exports = router;
