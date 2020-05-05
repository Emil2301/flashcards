const express = require('express');
const request = require('request');
const router = express.Router();
const createError = require('http-errors');
const Flashcard = require('../models/flashcard');

let title = '';
let translations = '';
let language = 'depl'

router.get('/:language', function (req, res) {
	console.log(req.params.language);
	language = req.params.language;
  res.json({language: req.params.language})
})

router.post('/', function (req, res, next) {
  console.log(req.body.title);
  const options = {
    url: `https://api.pons.com/v1/dictionary?q=${req.body.title}&l=${language}`,
    headers: {
      'X-Secret': '03777962ff3866e056ddee8eb0a9d2f54d953b9a108083985b0a9275b26b2435',
    },
  };
  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      let newInfo;
      data.map((obj) => {
        if (obj.lang === 'pl') {
          newInfo = obj.hits;
        }
      });

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
