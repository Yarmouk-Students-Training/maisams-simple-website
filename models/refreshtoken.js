'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here

      this.belongsTo(users, { foreignKey: 'username' })

    }
  };
  refreshToken.init({
    refresh_token:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,


      

    } ,

    username:{
      type:DataTypes.STRING,
      allowNull:false

    },
  }, {
    sequelize,
    tableName: 'refreshToken',
    modelName: 'refreshToken',
  });
  return refreshToken;
};