var UserModel = require('../models/index.js').User;

exports.getUser = function (username, password) {
  return UserModel.findOne({username: username, password: password}).exec();
};

exports.getUserById = function (id) {
  return UserModel.findById(id).exec();
};