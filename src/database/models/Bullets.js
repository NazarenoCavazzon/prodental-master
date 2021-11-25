const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Bullets = sequelize.define('Bullets', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.STRING,
        treatment_id: DataTypes.INTEGER,
    });
    return Bullets;
}