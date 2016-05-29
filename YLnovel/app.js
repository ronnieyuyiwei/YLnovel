var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var user = require('./dao/usersign');
var url = require("url");
var qs = require("querystring");
//var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.get('/', function (req, res) {
  res.render('index',{title:"露珠小说"})
});

app.get('/mypage', function (req, res) {
  res.render('mypage', {username:user.get_username()}
  )
});
app.get('/login', function (req, res) {
  res.render('login', { title:"登录"}
  )
});
app.post('/login', function (req, res) {
  user.login(req.body.id,req.body.password,req,res);
  console.log("后台得到"+ user.get_username());
  var test = "成功";
  res.send(test);


});
app.get('/register', function (req, res) {
  res.render('register', { title:"注册"}
  )
});
app.post('/register',function(req,res){
  user.register(req.body.id,req.body.password,res);
  var test = "注册成功"
  res.send(test)

});
app.get('/create-story', function (req, res) {
  res.render('create-story', { title:"创作"}
  )
});
app.get('/create-choose', function (req, res) {
  res.render('create-choose', { title:"创作"}
  )
});
app.get('/details', function (req, res) {
  res.render('details', { title:"故事详情"}
  )
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
