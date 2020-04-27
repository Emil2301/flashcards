const express = require('express');
const request = require('request');
const router = express.Router();
const createError = require('http-errors');
const Flashcard = require('../models/flashcard');

let query = 'dupa';
let translations = '';

/* GET home page. */
router.get('/', function (req, res) {
  res.json({ title: 'stronka' });
});

router.post('/', function (req, res, next) {
	Flashcard.deleteMany({title: 'Test title'})

  console.log(req.body.title);
  const options = {
    url: `https://api.pons.com/v1/dictionary?q=${req.body.title}&l=depl`,
    headers: {
      'X-Secret':
        '03777962ff3866e056ddee8eb0a9d2f54d953b9a108083985b0a9275b26b2435',
    },
  };
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
			const info = JSON.parse(body);
      query = info[0].hits[0].roms[0].headword;
			translations = info[0].hits[0].roms[0].arabs[0].translations;
			const flashCardData = new Flashcard({
				title: query, // String is shorthand for {type: String}
				source: 'Test source',
				target: 'Test target',
			});
		
			flashCardData.save((err) => {
				console.log(err);
			});

			Flashcard.find(function (err, cards) {
				if (err) return console.error(err);
				console.log(cards);
			})
      res.json({ title: query, translations });
    } else {
      next(createError(404));
    }
  }
  request(options, callback);
});

module.exports = router;
