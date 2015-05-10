var koa = require('koa');
var app = koa();
var serve = require('koa-static');
var mount = require('koa-mount');

app.use(mount('/js', serve('public/js')));

app.listen(3000);