const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const{QnA} = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  QnA.findAll({
    model:QnA,  
  }).then((qnas)=>{
    res.render('QnA',{
      qnas,
    });
  }).catch((err)=>{
    console.error(err);
    next(err);
  })
});

router.get('/:id', function(req, res, next) {
  QnA.findAll({
    where:{
      id:req.params.id
    }
  })
  .then((qna_infos) => {
    console.log(qna_infos);
    res.json(qna_infos);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  }); 
});

router.patch('/:id', (req, res, next) => {
  QnA.update({q_body:req.body.content}, {where: {id: req.params.id}})
  .then((result) => {
      res.json(result);
  })
  .catch((err) => {
      console.error(err);
      next(err);
  });
});

router.post('/', isLoggedIn, async (req,res,next)=>{
  const {title, content} = req.body;
  try{
    await QnA.create({
      q_title: title,
      q_body:content,
      q_nick: req.user.u_nickName,
    });
    return res.redirect('/QnA');
  }catch(err){
    console.error(err);
    return next(err);
  };
});

router.delete('/:id', (req, res, next) => {
  QnA.destroy({ where: { id: req.params.id } })
  .then((result) => {
      console.log(result);
      res.json(result);
  })
  .catch((err) => {
      console.error(err);
      next(err);
  });
});

module.exports = router;