const User = require('../models/User');

module.exports = {
  finalCatch: async (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;

    console.log(req.url);

    const messages = [];
    const errorStatus = err.status || 500;
    let errorName = '';
    const goBackTo = errorStatus != 404 ? req.url : null;

    console.log("error name: ", err.name);
    console.log("error code ", err.code);
    console.log("error status ", err.status);

    if (err.name === 'ValidationError') {
      errorName = 'Validation Error'
      Object.values(err.errors).forEach(item => {
        messages.push(item.message);
      });
    } else if (err.name === 'NotFoundError') {
      errorName = 'Not found'
      messages.push('The page or resource you are looking for has not been found.');
    } else if (err.code === 11000) {
      errorName = 'Invalid entry'
      messages.push('Invalid email entry')
    } else {
      errorName = 'Internal error'
      messages.push('Internal server error');
    }

    // render the error page
    res.status(errorStatus);
    res.render('pages/error', {
      errorName,
      errorStatus,
      messages,
      goBackTo
    });
  },
  validateRegistration: async (body) => {
    let errors = [];
    const {
      fname,
      lname,
      email,
      password,
      confirmPassword
    } = body;
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmail = email.match(emailFormat);
    const scriptString = '<script';

    const user = await User.findOne({ email: email });

    // Check if user is already registered.

    if (user) {
      errors.push({ text: 'Email already registered' });
    }

    if (
      fname.includes(scriptString) ||
      lname.includes(scriptString) ||
      email.includes(scriptString) ||
      password.includes(scriptString) ||
      confirmPassword.includes(scriptString)
    ) {
      errors.push({ text: 'Unauthorized html entity' });
    }

    // NAME

    if (!fname.length || !lname.length) {
      errors.push({ text: 'First and last name must be provided' });
    }

    // EMAIL

    if (!email.length || !isEmail) {
      errors.push({ text: 'Properly formatted email must be provided' });
    }

    // PASSWORD

    if (password != confirmPassword) {
      errors.push({ text: 'Passwords do not match' });
    }

    if (password.length < 8 || password.length > 16) {
      errors.push({ text: 'Passwords must be between 4 and 16 characters' });
    }

    if (!errors.length) {
      errors = null;
    }

    return errors;
  },
  validateLogin: async (body) => {

  }
}
