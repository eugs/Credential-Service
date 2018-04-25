const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', indexRouter);
// error handler
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
