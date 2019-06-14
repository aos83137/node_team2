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
router.get('/', function (req, res, next) {
  res.render('register');
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  const {
    id,
    nick,
    password
  } = req.body;
  try {
    // const exUser = await User.find({ where: { id } });
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      u_id: id,
      u_passwd: hash,
      u_nickName: nick,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    //확인 중복 아이디 일경우 만들어야함
    res.redirect('/register');
    alert('이미 존재하는 ID입니다');
    //확인
    return next(error);
  }
});

module.exports = router;
