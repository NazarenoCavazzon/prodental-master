const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        href: DataTypes.INTEGER,
        
    })

    Image.associate = (models =>{
        Image.belongsToMany(models.Treatment,{
            as: 'images',
            through: 'treatments_images',
            foreignKey: 'image_fk',
            otherKey: 'treatment_fk'
        });
    });
    return Image;
}