const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to db');
});

const Flashcard = require('./models/flashcard');

// Flashcard.findByIdAndUpdate('5ea6d94fc4e8a64443b0010b', { source: 'updated source3' }, (err, res) => {
// 	console.log(res);
// });

// Flashcard.findByIdAndRemove('5ea6f31c5d8a3b3e98a4c430', (err, res) => {
// 	console.log(res);
// });



// Flashcard.find().then((data) => {
// 	console.log(data);
// }).catch((err) =>  {
// 	console.log(err);
// })



const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
