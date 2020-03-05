const createError = require('http-errors');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./app/config/db');

const indexRouter = require('./app/routes/index');
const usersRouter = require('./app/routes/users');
const galleryRouter = require('./app/routes/gallery');

// @desc INITIALIZE APP
const app = express();
dotenv.config({ path: 'app/config/config.env' });
connectDB();

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// @ GLOBAL VARIABLES
// app.use(function(req, res, next) {
// 	res.locals.img = req.locals.img || null;
// 	next();
// });

// @desc MOUNT ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gallery', galleryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
