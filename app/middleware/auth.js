module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Access not authorized. Please, sign in.');
    res.redirect('/users/login');
  },
  checkInitial: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/users/login');
  }

};