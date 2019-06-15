const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();
const fs = require('fs');

const main = require('./routes/main');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const QnA = require('./routes/QnA');
const semester = require('./routes/semester');
const group_member = require('./routes/group_member');
const passportConfig = require('./passport');

const {
  sequelize
} = require('./models');

const app = express();
sequelize.sync(); //연동
passportConfig(passport);


fs.readdir('uploads', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser("1234"));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "1234",
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', main);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/semester', semester);
app.use('/QnA', QnA);
app.use('/group_member', group_member);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;