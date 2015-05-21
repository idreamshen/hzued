var User = require('../models/index.js').User;

exports.getUser = function (username, password) {
  return User.findOne({username: username, password: password}).exec();
};

exports.getUserById = function (id) {
  return User.findById(id).exec();
};

exports.newAndSave = function (username, password, nickname, email) {
  var user = new User({
    username: username,
    password: password,
    nickname: nickname,
    email: email
  });
  return user.save();
};