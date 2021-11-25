const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Bullets = sequelize.define('Bullets', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.BOOLEAN,
        treatment_id: DataTypes.INTEGER,
        img_url: DataTypes.STRING,
    });
    return Bullets;
}