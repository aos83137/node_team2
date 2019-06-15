const local = require('./localStrategy');

const {
  User
} = require('../models');

module.exports = (passport) => { //passport - app.js의 passport모듈의 객체
  passport.serializeUser((user, done) => {
    //user - 저장하려는 사용자 정보객체
    //done - 완료시 호출되는 콜백함수
    // console.log("여기는 인덱스.js "+user.u_id);

    done(null, user.id);
    // 인증이 완료되면 세션정보에 user.id 저장하기 위해 호출
  });

  passport.deserializeUser((id, done) => { //id를 u_id하니까 찾질 못함 
    //로그인 후 모든 요청에 대해 실행
    //req.user객체에 저장되기 때문에 사용하면 됨 
    //passport.session()에서 호출해주는 함수    
    User.find({ // User.find 는 promise임
        where: {
          id
        }
      })
      .then(user => {
        done(null, user)
      }) //req.user에 저장된다는 것 확인
      .catch(err => done(err));
  });
  local(passport); // 로그인 처리를 위한 passport 전략설정
  // kakao(passport);
};