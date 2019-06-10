module.exports = (sequelize, DataTypes) => (
    sequelize.define('answerqna', {
        ques_id:{
            type: DataTypes.CHAR(10),
            allowNull : false,
        },
        answer:{
            type: DataTypes.STRING(200),
            allowNull : false,
        },
    }, 
    {
      timestamps: true,
    })
  );
  