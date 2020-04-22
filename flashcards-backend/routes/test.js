var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.json({ title: 'stronka' });
});

router.post('/', function (req, res) {
  console.log(req.body.title);
  res.json({ title: req.body.title });
});

module.exports = router;
