module.exports = (sequelize, DataTypes) => (
    sequelize.define('qna', {
        q_title: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        q_body: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        q_nick: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);