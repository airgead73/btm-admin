const asyncHandler = require('../middleware/async');
const { validateRegistration } = require('../middleware/errors');
const User = require('../models/User');
const passport = require('passport');

exports.user_create_get = asyncHandler(async function (req, res, next) {
  res.render('pages/users/register', {
    title: 'register'
  });
})

exports.user_create_post = asyncHandler(async function (req, res, next) {
  const errors = await validateRegistration(req.body);
  const { fname, lname, email, password, confirmPassword } = req.body;

  if (errors) {
    console.log(errors)
    return res.status(400).render('pages/users/register', {
      errors: errors,
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
  }

  user = await User.create({
    fname: encodeURI(fname),
    lname: encodeURI(lname),
    email: email,
    password: password
  });

  req.flash('success_msg', 'You are now registered');
  res.status(201).redirect('/users/login');

});

exports.user_login_get = asyncHandler(async function (req, res, next) {
  res.render('pages/users/login', {
    title: 'login'
  });
})

exports.user_login_post = asyncHandler(async function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/works',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

exports.user_logout_get = asyncHandler(async function (req, res, next) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

