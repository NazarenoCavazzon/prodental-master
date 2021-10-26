const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define('Banner', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING
    })
    return Banner;
}