exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send('로그인 필요');
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      console.log('re?'); //아니 세션 저장 안되니거같은데
      next();
    } else {
      console.log('re?2');
      
      res.redirect('/');
    }
  };
  