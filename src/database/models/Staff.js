const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define('Staff', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        matricula:DataTypes.STRING,
        en_description:DataTypes.STRING,
        es_description:DataTypes.STRING,
        image:DataTypes.STRING,
    });
    return Staff;
}