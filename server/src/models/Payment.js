const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Payment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        activationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("fullfiled", "rejected", "pending"),
        },
    },
    { timestamps: false, freezeTableName: true });
};
