var koa = require('koa');
var app = koa();
var jade = require('koa-jade');
var path = require('path');
var post = require('koa-epost');
var session = require('koa-session');
var staticCache = require('koa-static-cache');
var mount = require('koa-mount');

var router = require('./routes/index.js');
var config = require('./config.json');

app.use(post);
app.use(mount('/js', staticCache(path.join(__dirname, 'public/js'), {maxAge: 7 * 24 * 60 * 60})));
app.use(mount('/css', staticCache(path.join(__dirname, 'public/css'), {maxAge: 7 * 24 * 60 * 60})));
app.use(mount('/img', staticCache(path.join(__dirname, 'public/img'), {maxAge: 7 * 24 * 60 * 60})));

app.keys = config.keys;
app.use(session(app));
app.use(jade.middleware({
  viewPath: path.resolve(__dirname, 'views'),
  debug: true
}));

app.use(router.routes());

app.listen(3000);