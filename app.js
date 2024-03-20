var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models');
const error = require('./midleware/error');
const cors = require('cors');
const whiteUrl = require('./config/whiteUrl');
const timeout = require('connect-timeout');
const ErrorResponse = require('./utils/ErrorResponse');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require("method-override")



//call routes
var indexRouter = require('./routes/index');
var productRouter = require('./routes/productRoute');
var userRouter = require('./routes/userRoute');
var authRouter = require('./routes/authRoute');
const authMidleware = require('./midleware/authMidleware');

var app = express();



//set cors
var corsOptions = {
  origin: function (origin, callback) {
    if (whiteUrl.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}



//set time out
app.use(timeout(process.env.TIMEOUT));
app.use((req, _, next) => {
  if (!req.timedout) next();
});
app.use(function (req, res, next) {
  setTimeout(next, 200);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//for make a session
app.use(session({
  secret : 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 100000}
}));


//for make flash message
app.use(flash());
app.use(methodOverride('_method'))
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//untuk meload data asset dari sb admin 2
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')))
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/admin/product', productRouter);
app.use('/admin/user', userRouter);
app.use(error);




db.sequelize.sync({ force: false }).then(() => {
  console.log("Database running");
}).catch(err => {
  console.log(err.message);
})

module.exports = app;
