const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dni: {
            type: DataTypes.STRING,
            defaultValue: "-"
        },
        plan: DataTypes.STRING,
        security_code: DataTypes.STRING,
    })

    User.associate = (models =>{
        User.hasMany(models.Turn,{
            as: 'turns',
            foreignKey: 'user_id'
        })
    })
    
    return User;
}