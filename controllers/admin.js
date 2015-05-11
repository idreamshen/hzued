var User = require('../proxy/user.js');
var Topic = require('../proxy/topic.js');

/**
 * @desc 后台注册
 * @param next
 */
exports.register = function *(next) {
  // TODO
};

/**
 * @desc 后台登陆
 * @param next
 */
exports.login = function *(next) {
  if (this.method === 'GET') {
    this.render('admin/login');
  } else if (this.method === 'POST') {
    var name = this.post.name;
    var pass = this.post.pass;
    var user = yield User.getUser(name, pass);
    if (user) {
      if (user.is_admin) {
        this.session.adminLogged = 1;
        this.session.user = {
          _id: user._id
        };
        this.redirect('/admin');
      } else {
        this.body = '您无权登陆';
      }
    } else {
      this.body = '账号或密码错误';
    }
  }
};

/**
 * @desc 后台控制面板
 * @param next
 */
exports.index = function *(next) {
  if (this.session.adminLogged) {
    var conditions = {deleted: false};
    var projection = {title: 1, create_at: 1};
    var options = {};
    var topics = yield Topic.getTopicsByQuery(conditions, projection, options);
    console.log(topics);
    this.render('admin/index', {
      topics: topics
    });
  } else {
    this.redirect('/admin/login');
  }
};