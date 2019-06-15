const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {
  User
} = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'u_id',
    passwordField: 'password',
  }, async (u_id, password, done) => {
    try {
      const exUser = await User.find({
        where: {
          u_id
        }
      });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.u_passwd);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, {
            message: '비밀번호가 일치하지 않습니다.'
          });
        }
      } else {
        done(null, false, {
          message: '가입되지 않은 회원입니다.'
        });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};