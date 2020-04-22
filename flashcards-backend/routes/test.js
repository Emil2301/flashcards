var express = require('express');
var request = require('request');
var router = express.Router();

let query = 'query';

/* GET home page. */
router.get('/', function (req, res) {
  res.json({ title: 'stronka' });
});

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
		const info = JSON.parse(body);
		console.log(info[0].hits[0].roms[0].arabs[0].translations.map(trans => {
			console.log(trans.source);
			console.log(trans.target);
		}));
		query = info[0].hits[0].roms[0].headword;
  }
}

router.post('/', function (req, res) {
	console.log(req.body.title);
	const options = {
		url: `https://api.pons.com/v1/dictionary?q=${req.body.title}&l=depl`,
		headers: {
			'X-Secret': '03777962ff3866e056ddee8eb0a9d2f54d953b9a108083985b0a9275b26b2435'
		}
	};
	request(options, callback);
  res.json({ title: query });
});

module.exports = router;
