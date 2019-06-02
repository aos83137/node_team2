var express = require('express');
var router = express.Router();
var {User} = require('../models');

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
  .then((result) => {
    console.log(result);
    res.status(201).json(result);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
  res.redirect('/');
});


module.exports = router;
