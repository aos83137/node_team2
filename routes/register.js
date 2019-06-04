var express = require('express');
var router = express.Router();
var {User} = require('../models');
var alert = require('alert-node');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', (req, res, next) => {
  User.create({
    u_id: req.body.id,
    u_passwd: req.body.password,
    u_nickName: req.body.nick,
  })
  .then(result => {
    console.log(result);
    res.redirect('/');
  })
  .catch((err) => {
    console.log(err);
    res.redirect('/register');
    alert('이미 존재하는 ID입니다');  //ID 중복되는 것과 Nick 중복되는 것을 구분 못하겠음. 책 371p의 내용으로 바꾸기. 
  });
});


module.exports = router;