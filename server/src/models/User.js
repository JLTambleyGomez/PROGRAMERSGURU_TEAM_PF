const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg"
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            banned: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            expirationDate: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            nickName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING
            }
        },
        { timestamps: false, freezeTableName: true }
    );
};