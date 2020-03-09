const createError = require('http-errors');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./app/config/db');
const Handlebars = require('handlebars');
const flash = require('connect-flash');
const helmet = require('helmet');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const sessionConfig = require('./app/config/session');
const exphbs = require('express-handlebars');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const { finalCatch } = require('./app/middleware/errors');
const {
	allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');

const indexRouter = require('./app/routes/index');
const usersRouter = require('./app/routes/users');
const worksRouter = require('./app/routes/works');
const photosRouter = require('./app/routes/photos');


// @desc INITIALIZE APP
const app = express();

// @desc SECURITY
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(mongoSanitize());
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 mins
	max: 100
});
app.use(limiter);

// @desc HBS HELPERS
const {
	truncate,
	stripTags,
	formatDate,
	select
} = require('./app/helpers/hbs');

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'hbs');
app.engine(
	'hbs',
	exphbs({
		handlebars: allowInsecurePrototypeAccess(Handlebars),
		helpers: {
			truncate: truncate,
			stripTags: stripTags,
			formatDate: formatDate,
			select: select
		},
		defaultLayout: 'main',
		extname: '.hbs',
		layoutsDir: __dirname + '/app/views/layouts/',
		partialsDir: __dirname + '/app/views/partials/'
	})
);

// @desc EXPRESS MIDDLEWARE

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/app/public'));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {}
}));

// @desc PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
require('./app/config/passport')(passport);

// @desc MESSAGING
app.use(flash());

// @desc GLOBAL VARIABLES
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.new_photo = req.flash('new_photo');
	res.locals.user = req.user || null;
	next();
});

// @desc MOUNT ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/works', worksRouter);
app.use('/photos', photosRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(finalCatch);



module.exports = app;
