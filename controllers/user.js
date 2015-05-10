var User = require('../proxy/index.js').User;

/**
 * @desc 后台注册
 * @param next
 */
exports.adminRegister = function *(next) {

};

/**
 * @desc 后台登陆
 * @param next
 */
exports.adminLogin = function *(next) {
  if (this.method === 'GET') {
    this.render('admin/login');
  } else if (this.method === 'POST') {
    var name = this.post.name;
    var pass = this.post.pass;
    var user = yield User.getUser(name, pass);
    if (user) {
      this.session.adminLogged = 1;
      this.redirect('/admin');
    } else {
      this.body = '账号或密码错误';
    }
  }
};

/**
 * @desc 后台控制面板
 * @param next
 */
exports.adminDashboard = function *(next) {
  if (this.session.adminLogged) {
    this.render('admin/index')
  } else {
    this.redirect('/admin/login');
  }
};