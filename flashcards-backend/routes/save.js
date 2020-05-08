const express = require('express');
const request = require('request');
const router = express.Router();
const createError = require('http-errors');
const Flashcard = require('../models/flashcard');

router.get('/', function (req, res) {
  Flashcard.find((err, cards) => {
    if (err) return console.error(err);
    return res.json({ cards });
  });
});

router.post('/', function (req, res, next) {
  const flashCardData = new Flashcard({
    title: req.body.title,
    translations: req.body.translations,
  });

  Flashcard.find({ title: req.body.title }, (err, cards) => {
    if (err) return console.error(err);
    if (!cards.length) {
      flashCardData.save((err) => {
        Flashcard.find({ title: req.body.title }, (err, cards) => {
          if (err) return console.error(err);
        });
      });
    } else {
      Flashcard.findOneAndUpdate({ title: req.body.title }, { translations: req.body.translations }, (err, res) => {
        Flashcard.find({ title: req.body.title }, (err, cards) => {
          if (err) return console.error(err);
        });
      });
    }
  });

  res.json({ message: 'Your flashcard was saved', title: req.body.title, source: req.body.source, target: req.body.target });
});

router.delete('/:title', function (req, res) {
  Flashcard.findOneAndRemove({ title: req.params.title }, (err, response) => {
    Flashcard.find((err, cards) => {
      if (err) return console.error(err);
      res.json({ cards });
    });
  });
});

module.exports = router;
