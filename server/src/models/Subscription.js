const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('subscription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('mensual', 'trimestral', 'anual'), // tipo de suscripcion: mensual, anual, etc
        allowNull: false
    }
  }, { timestamps: false , freezeTableName: true});
};
