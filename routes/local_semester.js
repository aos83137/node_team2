var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('local_semester',{
      user:req.user,  
  
    });
});

module.exports = router;