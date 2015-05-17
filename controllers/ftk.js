var User = require('../proxy/').User;


exports.index = function *(next) {

  if (this.session.hasOwnProperty('user')) {
    var me = {
      nickname: this.session.user.nickname,
      user_id: this.session.user._id
    }
  }
  this.render('ftk.jade', {
    me: me
  });
};