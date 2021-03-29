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
    firstuser:{
      type: DataTypes.STRING,
      allowNull: false
    },
    seconduser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status:{
      type:DataTypes.STRING,
      allowNull: false
    } 
  }, {
    sequelize,
    tableName: 'friends',
    modelName: 'friends',
  });
  return friends;
};