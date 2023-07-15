const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Subscription",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.ENUM("mensual", "trimestral", "anual"), // tipo de suscripcion: mensual, anual, etc
            },
        },
        { timestamps: false, freezeTableName: true }
    );
};
