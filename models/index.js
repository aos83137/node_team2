const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Introduce = require('./introduce')(sequelize, Sequelize);
db.QnA = require('./QnA')(sequelize, Sequelize);
db.answerQnA = require('./answerQnA')(sequelize, Sequelize);

module.exports = db;