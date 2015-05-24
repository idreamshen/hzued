var Chat = require('../models').Chat;
var User = require('../models').User;

exports.index = function *(next) {
  var me = this.session.user;
  var chats = yield Chat.find({},{},{limit:10}).exec();
  for (var i in chats) {
    var chat = chats[i];
    var userid = chat.user_id;
    var user = yield User.findById(userid).exec();
    chat.nickname = user.nickname;
  }
  console.log(chats);
  this.render('chat', {
    me: me,
    chats: chats
  });
};