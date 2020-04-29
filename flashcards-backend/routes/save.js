const express = require('express');
const request = require('request');
const router = express.Router();
const createError = require('http-errors');
const Flashcard = require('../models/flashcard');

let title = '';
let translations = '';

router.post('/', function (req, res, next) {
  console.log(req.body);
  const flashCardData = new Flashcard({
    title: req.body.title,
    source: req.body.source,
    target: req.body.target,
  });

  flashCardData.save((err) => {
    console.log(err);
  });

  res.json({ message: 'Your flashcard was saved', title: req.body.title, source: req.body.source, target: req.body.target });
});

module.exports = router;
