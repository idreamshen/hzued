exports.index = function *(next) {
  if (this.session.user) {
    this.render('plugin');
  } else {
    this.redirect('/login');
  }
};