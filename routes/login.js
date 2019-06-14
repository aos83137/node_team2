const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {
  isNotLoggedIn,
  isLoggedIn
} = require('./middlewares');

const router = express.Router();


/* GET home page. */
router.get('/', isNotLoggedIn,function (req, res, next) {
  res.render('login',{
    loginError: req.flash('loginError'),
  });
});

router.post('/', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.log('check');
      req.flash('loginError', info.message);
      return res.redirect('/login');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

module.exports = router;

