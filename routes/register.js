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
  user: req.user,
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
    //확인
    res.redirect('/register');
    alert('이미 존재하는 ID입니다');
    //확인
    return next(error);
  }
  // User.create({
  //   u_id: req.body.id,
  //   u_passwd: req.body.password,
  //   u_nickName: req.body.nick,
  // })
  // .then((result) => {
  //   // console.log(result);
  //   // res.status(201).json(result);
  // }).catch((err) => {
  //   console.error(err);
  //   next(err);
  // });
  // res.redirect('/');
});

module.exports = router;
