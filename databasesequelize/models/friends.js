'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here

      
    }
    toJSON(){
      return{...this.get(), friendid: undefined}
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
    tableName: 'friends',
    modelName: 'friends',
  });
  return friends;
};