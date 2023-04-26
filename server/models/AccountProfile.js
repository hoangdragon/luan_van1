module.exports = (sequelize, DataTypes) => {
    const AccountProfile = sequelize.define('AccountProfile', {
        id_profile: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })

    return AccountProfile
}