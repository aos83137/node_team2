var express = require('express');
var router = express.Router();
const path = require('path');
const {Post} = require('../models');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,'uploads/'); //폴더이름
  },
  filename(req, file, cb) { // 파일이름 
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    cb(null,basename + "-" + Date.now() + extension);
  }
})
var upload = multer({storage:_storage})

/* GET home page. */
router.get('/', function(req, res, next) {
  
  Post.findAll({ // 이걸로 db 가져옴 
      model: Post, //models 에 post 가져온 변수
      attributes: ['img'], //속성 이름
  })
   .then((posts)=>{
    res.render('local_semester', { //render 방식으로 pug에 객체 보냄
      title : 'team2',  //db이름
      aaaa : posts,    
       //post 테이블의 내용이 posts인듯 aaaa라는 키값으로 보내서 pug에서 쓸거
    });
   })
   .catch((error)=>{
     console.error(error);
     next(error);
   })
});

router.post('/img', upload.single('userfile'), function(req,res,next){
  // 'userfile' pug파일에 보면 인풋에 이름이랑 맞춰야함
  Post.create({ // models에 insert 
    img:  `/img/${req.file.filename}`, // 거기에 img 속성에 이값 넣음
  })
;
  res.redirect('/'); // 이미지넣고 페이지 다시불러옴으로써 새로고침 안하고 이미지 뜸 
});

module.exports = router;
