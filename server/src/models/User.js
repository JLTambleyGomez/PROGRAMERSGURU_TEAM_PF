const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("User", {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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
            image: {
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
            expirationDate: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            nickName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: false, freezeTableName: true }
    );
};