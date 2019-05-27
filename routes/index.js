var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('HF');
});

router.get('/signIn', function(req, res, next) {
  res.render('signIn');
});

router.get('/registor', function(req, res, next) {
  res.render('registor');
});

router.get('/QnA', function(req, res, next) {
  res.render('QnA');
});

module.exports = router;
