var UserModel = require('../models/index.js').User;

exports.getUser = function (username, password) {
  return UserModel.findOne({password: username, password: password}).exec();
};