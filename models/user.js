module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {

        u_id: {
            type: DataTypes.STRING(20),
            primaryKey : true,
        },
        u_passwd : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        u_nickName : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
    }, 
    {
      timestamps: true,
    })
  );
  