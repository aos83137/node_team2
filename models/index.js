const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize( //config 파일에 정보 가져와서 담음 
  config.database, config.username, config.password, config,
);


db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Introduce = require('./introduce')(sequelize, Sequelize);

module.exports = db;
