const express = require('express');
const {
  isNotLoggedIn,
  isLoggedIn
} = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;