const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Sponsor = sequelize.define('Sponsor', {
        image: DataTypes.STRING,
        name: DataTypes.STRING,
    });
    return Sponsor;
}