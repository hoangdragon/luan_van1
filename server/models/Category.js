module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    
    
    return Category
}