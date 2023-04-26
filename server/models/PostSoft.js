

module.exports = (sequelize, DataTypes) => {
    const PostSoft = sequelize.define('PostSoft', {
        id_postsoft: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type:DataTypes.STRING,
            allowNull: false
        },
        name: {
            type:
                DataTypes.STRING,
            allowNull: false
        },
        price: {
            type:
                DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type:
                DataTypes.STRING,
            allowNull: false
        },
        file_zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })

    return PostSoft
}