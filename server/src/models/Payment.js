const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Payment",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("fullfiled", "rejected", "pending"),
            },
            totalPrice: {
                type: DataTypes.INTEGER,
            },
        },
        { timestamps: false, freezeTableName: true }
    );
};
