module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    Role.associate = (models) => {
        Role.hasMany(models.Account, {
            foreignKey: 'role_id'
        },
            { onDelete: "cascade" });
    };
   
    return Role
}