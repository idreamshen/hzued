var User = require('../proxy').User;
var Topic = require('../proxy').Topic;

exports.login = function *(next) {
  if (this.method === 'GET') {
    if (this.session.user) {
      this.redirect('/');
    } else {
      this.render('login');
    }
  } else if (this.method === 'POST') {
    // TODO
    var username = this.post.username;
    var password = this.post.password;
    var user = yield User.getUser(username, password);
    if (user) {
      this.session.user = {
        _id: user._id,
        id: user.id,
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
    var username = this.post.username;
    var password = this.post.password;
    var nickname = this.post.nickname;
    var email = this.post.email;

    if (!username || !password || !nickname || !email) {
      this.render('register', {
        err: '内容未填写完整'
      });
      return;
    }

    try {
      var user = yield User.newAndSave(username,password, nickname, email);
      if (user) {
        this.session.user = {
          _id: user._id,
          id: user.id,
          nickname: user.nickname
        };
        this.redirect('/');
      } else {
        this.render('register', {
          err: '注册失败'
        });
      }
    } catch (e) {
      if (e.code === 11000) {
        this.render('register', {
          err: '注册失败，用户名已存在。'
        });
        console.log(e.errmsg);
      } else {
        this.render('register', {
          err: '注册失败'
        });
      }
    }
  }
};

exports.logout = function *(next) {
  this.session.user = undefined;
  this.redirect('/');
};