const User = require('../models/User');
exports.user_create_get = async function (req, res, next) {
  res.render('pages/users/register', {
    title: 'register'
  });
}

exports.user_create_post = async function (req, res, next) {
  const { fname, lname, email, password } = req.body;
  try {
    // create user
    user = await User.create({
      fname,
      lname,
      email,
      password
    });

    req.flash('success_msg', 'You are now registered')
    res.redirect('/users/login');
  } catch (err) {

    let messages = [];

    if (err.name === 'ValidationError') {
      Object.values(err.errors).forEach(item => {
        messages.push(item.message);
      });

      req.flash('error_msg', message);
      res.redirect('/users/login');
    } else if (err.code === 11000) {
      req.flash('error_msg', 'Dublicate field value entered')
    } else {
      console.log(err);
      res.status(err.status || 500);
      res.render('pages/error');
    }




  }



}

exports.user_login_get = async function (req, res, next) {
  res.render('pages/users/login', {
    title: 'login'
  });
}

exports.user_login_post = async function (req, res, next) {
  console.log(req.body);
  res.redirect('/works');
}

exports.user_logout_get = async function (req, res, next) {
  res.redirect('/users/login');
}

