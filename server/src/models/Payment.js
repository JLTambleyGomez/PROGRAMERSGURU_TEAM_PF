const { DataTypes } = require("sequelize");

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
                defaultValue: null,
            },
            status: {
                type: DataTypes.ENUM("fullfiled", "rejected", "pending"),
                defaultValue: "pending",
            },
            totalPrice: {
                type: DataTypes.FLOAT,
            },
        },
        { timestamps: false, freezeTableName: true }
    );
};
