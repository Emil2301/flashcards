const express = require('express');
const request = require('request');
const router = express.Router();
const createError = require('http-errors');
const Flashcard = require('../models/flashcard');

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.post('/', function (req, res, next) {
  // console.log(req.body);

  const flashCardData = new Flashcard({
    title: req.body.title,
    translations: req.body.translations,
  });

  Flashcard.find({ title: req.body.title }, (err, cards) => {
    if (err) return console.error(err);
    if (!cards.length) {
			console.log('WLASNIE ZAPISALES ' + req.body.title);
      flashCardData.save((err) => {
        Flashcard.find({ title: req.body.title }, (err, cards) => {
          if (err) return console.error(err);
          console.log(cards);
        });
      });
    } else {
      console.log('WLASNIE ZAPTEJDOWALES ' + req.body.title);
      Flashcard.findOneAndUpdate({ title: req.body.title }, { translations: req.body.translations }, (err, res) => {
        Flashcard.find({ title: req.body.title }, (err, cards) => {
          if (err) return console.error(err);
          console.log(cards);
        });
      });
    }
  });

  // flashCardData.save((err) => {
  //   Flashcard.find((err, cards) => {
  //     if (err) return console.error(err);
  //     console.log(cards);
  //   });
  // });

  res.json({ message: 'Your flashcard was saved', title: req.body.title, source: req.body.source, target: req.body.target });
});

module.exports = router;
