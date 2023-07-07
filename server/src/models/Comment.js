const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Comment",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: {
                        args: [1, 50],
                        msg: "Debe ingresar un mensaje que contenga hasta 50 caracteres",
                    },
                },
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Debe ingresar una fecha",
                    },
                },
            },
            rating: {
                type: DataTypes.INTEGER,
                validate: {
                    max: 5,
                    min: 1,
                }
            }
        },
        { timestamps: false, freezeTableName: true }
    );
};