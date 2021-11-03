const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Turn = sequelize.define('Turn', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        treatment_id: DataTypes.INTEGER,
        user_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        date: DataTypes.DATE
    })

    Turn.associate = (models =>{
        Turn.belongsTo(models.User,{
            as: 'user',
            foreignKey: 'user_id'
        })
        Turn.belongsTo(models.Treatment, {
            as: 'treatment',
            foreignKey: 'treatment_id'
        });
    });
    return Turn;
}