var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var user = require('./dao/usersign');
var story = require('./dao/story');
//var dbConnect = require("./dao/dbConnect");
//var url = require("url");
//var qs = require("querystring");
//var routes = require('./routes/index');
var app = express();
var session = require('express-session');
var fs = require("fs");
var multiparty = require('multiparty');
var util = require('util');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}))
var index = require("./dao/index");
var detalis = require("./dao/details");

var username; //session
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.get('/', function (req, res) {
    index.get_index();
    res.render('index', {title: "露珠小说",story:[{name:index.indexinfo.story_title,author:index.indexinfo.author,
        comments:index.indexinfo.comments_num,zan:index.indexinfo.zan_num,src:"/images/photos/science.png"
    }]})
});
app.get('/basic-info', function (req, res) {
    res.render('basic-info', {title: "我的信息",username:username})
});

app.get('/mypage', function (req, res) {
        console.log(username)
        if (username) {
            res.render('mypage', {username: username})
        } else {
            res.render('mypage', {username: "登录"})
        }
    }
);
app.get('/login', function (req, res) {
    res.render('login', {title: "登录"}
    )
});
app.post('/login', function (req, res) {
    user.login(req.body.id, req.body.password, req, res);
    console.log("后台得到" + user.get_username());
    req.session.username = req.body.id;
    username = req.session.username;
    console.log("session" + req.session.username);
    var test = "成功";
    res.send(test);
});


app.get('/register', function (req, res) {
    res.render('register', {title: "注册"}
    )
});
app.post('/register', function (req, res) {
    user.register(req.body.id, req.body.password, res);
    var test = "注册成功"
    res.send(test)

});
app.get('/create-story', function (req, res) {
    res.render('create-story', {title: "创作", username: username}
    )
});
app.post('/create-story', function (req, res) {

    story.add_story(req.body.title, req.body.summary, req.body.story_content, username, req.body.classify);
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/images/photos'});
    //上传完成后处理
    form.parse(req, function (err, fields, files,req) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/images/photos' + inputFile.originalFilename;

            //重命名为真实文件名
            //var dstPath = './public/images/' + req.body.filename;
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
            res.end();
        }
    })
    //var test = "返回成功"
    //res.send(test);
    res.redirect("/")
});
app.get("/story_content1",function(req,res){
    detalis.getinfo()
    res.render("story_content1",{story_title:detalis.detailsinfo.story_title,
        focus:detalis.detailsinfo.focus,branch:detalis.detailsinfo.branch,zan:detalis.detailsinfo.zan_num,author:detalis.detailsinfo.author,summary:detalis.detailsinfo.summary,story_content1:detalis.detailsinfo.content,story_content2:detalis.detailsinfo.content2,story_content3:detalis.detailsinfo.content3})
})
app.get('/create-choose', function (req, res) {
    res.render('create-choose', {title: "创作"}
    )
});
app.get('/details', function (req, res) {
    detalis.getinfo()
    res.render('details', {title: "故事详情",story_title:detalis.detailsinfo.story_title,
    focus:detalis.detailsinfo.focus,branch:detalis.detailsinfo.branch,zan:detalis.detailsinfo.zan_num,author:detalis.detailsinfo.author,summary:detalis.detailsinfo.summary}
    )
});
app.get('/product_list', function (req, res) {
    detalis.getinfo();
    res.render('product_list', {title: "故事详情",story_title:detalis.detailsinfo.story_title,zan_num:detalis.detailsinfo.zan_num,summary:detalis.detailsinfo.summary}
    )
});
app.get('/success', function (req, res) {
    res.render('success', {})
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
