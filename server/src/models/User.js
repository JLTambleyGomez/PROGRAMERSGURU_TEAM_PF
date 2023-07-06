const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('User', {

      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
     },
      image: {
         type: DataTypes.STRING
      },
      name: {
         type: DataTypes.STRING
      },
      nickName: {
         type: DataTypes.STRING
      },
      email:{
         type: DataTypes.STRING,  
         allowNull: false,
         validate: {
            isEmail: true,
          },
      },
      password:{
         type: DataTypes.STRING,  
         allowNull: false,
      },
      isAdmin:{
         type: DataTypes.BOOLEAN,
         defaultValue: false,
      },
      isBanned: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
      // idLastSubscriptionOrder: {

      // },
      // subscription: {
         
      // }
   }, { timestamps: false, freezeTableName: true });
};
