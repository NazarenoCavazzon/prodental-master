const {sequelize, DataTypes} = require('sequelize');
const Bullets = require('./Bullets');

module.exports = (sequelize, DataTypes) => {
    const Treatment = sequelize.define('Treatment', {
        title: DataTypes.STRING,
        subtitle: DataTypes.STRING,
        image_principal: DataTypes.STRING,
        short_description: DataTypes.STRING,
        info: DataTypes.STRING,
        info_title: DataTypes.STRING,
        video: DataTypes.STRING,
        description_title: DataTypes.STRING,
        description: DataTypes.STRING,
        footer: DataTypes.STRING,
        footer_title: DataTypes.STRING,
        bullets_title: DataTypes.STRING,
        bullets_json: DataTypes.STRING,
        lang: DataTypes.STRING,
        treatment: DataTypes.INTEGER,
    })

    Treatment.associate = (models => {
        Treatment.hasMany(models.Turn,{
            as: 'turns',
            foreignKey: 'treatment_id'
        })
        Treatment.hasMany(models.Bullets,{
            as: 'bullets', 
            foreignKey: 'treatment_id'
        })
    })
    
    
    return Treatment;
}