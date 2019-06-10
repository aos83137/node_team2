var express = require('express');
var router = express.Router();
var {Introduce} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('group_member',{
    user:req.user,  

  });
});

router.get('/:id', function(req, res, next) {
  //이해하기 위한 주석(용석)
  //이미지 클릭시 '/:id' , get이 불린다.
  //findAll로 모든 행 가져옴
  Introduce.findAll({
        where:{
          id:req.params.id
        }
  })
  .then((member_infos) => { //findAll값이 member_infos
        console.log(member_infos);
        res.json(member_infos); //json으로 group_member.pug로 던져줌 res에 저장됨
  })
  .catch((err) => {
    console.error(err);
    next(err);
  }); 
});

module.exports = router;