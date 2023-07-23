const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Course", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        meanRating: {
            type: DataTypes.FLOAT,
        },
        released: {
            type: DataTypes.DATEONLY,
        },
        isFree: {
            type: DataTypes.BOOLEAN,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: false, freezeTableName: true });
};