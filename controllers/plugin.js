exports.index = function *(next) {
  if (this.user) {
    this.render('plugin');
  } else {
    this.redirect('/login');
  }
};