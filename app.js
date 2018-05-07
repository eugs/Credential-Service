const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const fs = require('fs');
const path = require('path');
const app = express();
const logStream = fs.createWriteStream(path.join(__dirname, 'logging.log'), { flags: 'a' });

app.use(logger('dev', { stream: logStream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', indexRouter);
// error handler
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
