const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Testimonial = sequelize.define('Testimonial', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        description:DataTypes.STRING,
        author: DataTypes.STRING
    })

    
    return Testimonial;
}