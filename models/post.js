module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', { //posts 테이블 만들어짐
      img: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );
  