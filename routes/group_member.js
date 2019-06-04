var express = require('express');
var router = express.Router();
var {Introduce} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('group_member');
});

router.get('/:id', function(req, res, next) {
  Introduce.findAll({
        where:{
          id:req.params.id
        }
  })
  .then((member_infos) => {
        console.log(member_infos);
        res.json(member_infos);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  }); 
});

module.exports = router;