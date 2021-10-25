const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define('Banner', {
        image: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    });
    return Banner;
}