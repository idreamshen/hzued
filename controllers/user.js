var User = require('../proxy').User;
var Topic = require('../proxy').Topic;

exports.login = function *(next) {
  this.render('login');
};

exports.register = function *(next) {
  this.render('register');
};