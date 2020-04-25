var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flashcardSchema = new Schema({
  title: {type: String, required: true}, // String is shorthand for {type: String}
  source: {type: String, required: true},
  target: {type: String, required: true},
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
