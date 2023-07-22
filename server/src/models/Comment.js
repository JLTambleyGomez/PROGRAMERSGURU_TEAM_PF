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
                        args: [1, 280],
                        msg: "Debe ingresar un mensaje que contenga hasta 280 caracteres",
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
                type: DataTypes.FLOAT,
                validate: {
                    max: 5,
                    min: 0,
                }
            }
        },
        { timestamps: false, freezeTableName: true }
    );
};