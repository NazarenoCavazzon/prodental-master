const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Sponsors = sequelize.define('Sponsors', {
        image: DataTypes.STRING,
        name: DataTypes.STRING,
    });
    return Sponsors;
}