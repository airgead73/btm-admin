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
  }
}