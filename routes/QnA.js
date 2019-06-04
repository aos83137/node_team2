var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('QnA',{
    user:req.user,  

  });
});

module.exports = router;