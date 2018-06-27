const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const splunkBunyan = require('splunk-bunyan-logger');
const api = require('./routes/api');
const app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
if (process.env.NODE_ENV === 'production') {
  const splunkStream = splunkBunyan.createStream(config);
  app.use(require('express-bunyan-logger')({
    name: 'logger',
    streams: [splunkStream],
  }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/// api
app.use('/api', api);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    console.log('ttt');
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handler
/// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
