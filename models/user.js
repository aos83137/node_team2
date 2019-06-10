module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        u_id: {
            type: DataTypes.STRING(20),
            allowNull:true,
            unique : true,
        },
        u_passwd : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        u_nickName : {
            type : DataTypes.STRING(20),
            allowNull : false,
            unique : true,
        },
    }, 
    {
      timestamps: true,
      paranoid: true,
    })
  );
  