const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
           name: {
            type: DataTypes.STRING
           }
        },
        { timestamps: false, freezeTableName: true }
    );
};