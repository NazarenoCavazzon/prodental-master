const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        is_admin: DataTypes.BOOLEAN,
        dni: DataTypes.STRING,
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