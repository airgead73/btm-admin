const User = require('../models/User');
exports.user_create_get = async function (req, res, next) {
  res.send("GET display register form");
}

exports.user_create_post = async function (req, res, next) {
  res.send("POST process register form");
}

exports.user_login_get = async function (req, res, next) {
  res.render('pages/users/login', {
    layout: 'login',
    title: 'btm admin'
  });
}

exports.user_login_post = async function (req, res, next) {
  res.send("POST process login form");
}

exports.user_logout_get = async function (req, res, next) {
  res.send("GET user logout");
}

