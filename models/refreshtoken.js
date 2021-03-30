'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refreshtoken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      this.belongsTo( users , {foreignKey : 'username'})
    }
  };
  refreshtoken.init({
    refreshtoken:{
      type: DataTypes.STRING(1000),
      unique:true,
      primaryKey:true
    
    }

  }, {
    sequelize,
    modelName: 'refreshtoken',
  });
  return refreshtoken;
};