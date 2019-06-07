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
      title : 'QnA',
      user:req.user,  
      qnas,
    });
  }).catch((err)=>{
    console.error(err);
    next(err);
  })
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
  }
})
module.exports = router;