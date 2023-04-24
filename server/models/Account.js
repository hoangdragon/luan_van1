module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        statusAccount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: false
    })
   Account.associate = (models) => {
        Account.hasMany(models.PostSoft, {
            foreignKey: 'username'
        },
            { onDelete: "cascade" });
    };
    Account.associate = (models) => {
        Account.hasOne(models.AccountProfile, {
            foreignKey: 'username'
        },
            { onDelete: "cascade" });
    };
    Account.associate = (models) => {
        Account.belongsTo(models.Role, {
            foreignKey: 'role_id'
        },
            { onDelete: "cascade" });
    };
    return Account
}