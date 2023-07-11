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
            image: {
                type: DataTypes.STRING,
                defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
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