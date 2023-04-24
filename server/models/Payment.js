module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        payment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        id_postsoft: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status_payment: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false
    })
    Payment.associate = (models) => {
        Payment.belongsTo(models.PostSoft, {
            foreignKey: 'id_postsoft'
        },
            { onDelete: "cascade" });
    };
   
    return Payment
}