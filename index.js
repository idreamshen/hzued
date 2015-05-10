var koa = require('koa');
var app = koa();
var jade = require('koa-jade');
var path = require('path');
var post = require('koa-epost');
var session = require('koa-session');
var serve = require('koa-static');
var mount = require('koa-mount');

var router = require('./routes/index.js');
var config = require('./config.json');

app.use(post);
app.use(mount('/js', serve('public/js')));
app.use(mount('/css', serve('public/css')));
app.use(mount('/img', serve('public/img')));

app.keys = config.keys;
app.use(session(app));
app.use(jade.middleware({
  viewPath: path.resolve(__dirname, 'views'),
  debug: true
}));

app.use(router.routes());

app.listen(3000);