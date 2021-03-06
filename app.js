var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uid = require('uid');
var multer  = require('multer');
var routes = require('./routes/index');
var extract = require('./routes/extract');

var app = express();
var MemoryStore = session.MemoryStore;
global.__base = __dirname + '/';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(multer({
    dest: __dirname + "/public/result"
}))
// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
/*generate unique token*/


app.use(express.static(path.join(__dirname, 'public')));
var token = uid(10);
console.log(token);
app.use(cookieParser(token));
app.use(session({
secret : token,
resave:true,
saveUninitialized :true
}));
app.use('/', routes);
app.use('/extract', extract);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

process.on('uncaughtException',function(err){
console.log(err);
});

module.exports = app;
