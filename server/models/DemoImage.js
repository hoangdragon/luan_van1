module.exports = (sequelize, DataTypes) => {
    const DemoImage = sequelize.define('DemoImage', {
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_postsoft: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
   
   
    return DemoImage
}