'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here

      
    }
  };
  friends.init({
    friendid:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,


    } 
  }, {
    sequelize,
    tableName: 'Friends',
    modelName: 'friends',
  });
  return friends;
};