const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Product", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
            },
            stock: {
                type: DataTypes.INTEGER,
            },
        },
        { timestamps: false }
    );
};