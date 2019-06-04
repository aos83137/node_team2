module.exports = (sequelize, DataTypes) => (
    sequelize.define('introduce', {
      name: {
        type: DataTypes.CHAR(10),
        allowNull: false,
      },
      explanation:{
        type: DataTypes.STRING(200),
        allowNull : false,
      },
    }, 
    {
      timestamps: false,
    })
  );
  