const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("User", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            isBanned: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            // expirationDate: {
            //     type: DataTypes.DATEONLY,
            //     defaultValue: null
            // },
            nickName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: false, freezeTableName: true }
    );
};