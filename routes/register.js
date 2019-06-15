var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const {
  isLoggedIn,
  isNotLoggedIn
} = require('./middlewares');
var {
  User
} = require('../models');
var alert = require('alert-node');

/* GET home page. */
router.get('/', (req, res, next) => {
  // user: req.user,
  res.render('register', {
    user: req.user,
    loginError: req.flash('loginError'),
  });
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  const {
    password,
    u_id,
    u_nickName,
  } = req.body;
  try {
    const exUser = await User.find({
      where: {
        u_id
      }
    });
    const exNick = await User.find({
      where: {
        u_nickName
      }
    });


    if (exUser) {
      req.flash('loginError', '이미 존재하는 아이디 입니다');
      return res.redirect('/register');
    } else if (exNick) {
      req.flash('loginError', '이미 존재하는 닉네임 입니다');
      return res.redirect('/register')
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      u_id,
      u_passwd: hash,
      u_nickName,
    });

    return res.redirect('/');
  } catch (error) {
    res.redirect('/register');
    return next(error);
  }
});

module.exports = router;