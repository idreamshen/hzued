var koa = require('koa');
var app = koa();

app.use(function *(){
    var self = this;
    setTimeout(function () {
        self.body = '123';
    }, 1000);
});

app.listen(3000);