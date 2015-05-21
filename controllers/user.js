var User = require('../proxy').User;
var Topic = require('../proxy').Topic;

exports.login = function *(next) {
  if (this.method === 'GET') {
    this.render('login');
  } else if (this.method === 'POST') {
    // TODO
    var username = this.post.username;
    var password = this.post.password;
    var user = yield User.getUser(username, password);
    if (user) {
      this.session.user = {
        _id: user._id,
        nickname: user.nickname
      };
      this.redirect('/');
    } else {
      this.body = '账号或密码错误';
    }
  }
};

exports.register = function *(next) {
  if (this.method === 'GET') {
    this.render('register');
  } else if (this.method === 'POST') {
    // TODO
  }
};