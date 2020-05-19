var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flashcardSchema = new Schema({
  title: {type: String, required: true}, // String is shorthand for {type: String}
  translations: {type: Object, required: true},
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
