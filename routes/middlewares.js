exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(err.status || 403);
      res.render('error',{
        message: '로그인 세션 만료'
      })
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {      
      res.redirect('/');
    }
  };
  
