'use strict';
const {Model} = require('sequelize');
const {comments} = require('request');
const {posts} = require('request');

module.exports = (sequelize, DataTypes) => {
  class reactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, posts }) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'username' })
      this.belongsTo(posts, { foreignKey: 'postid' })

    }
    toJSON(){ 
      return { ...this.get(), reactid: undefined }
    
    }   
  };
  reactions.init({
    reactid: { 
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      unique:true

    },
    postid:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false

    },
    react_type:{ 
      type: DataTypes.STRING,
      allowNull:false,
    }
  }, {
    sequelize,
    tableName: 'reactions',
    modelName: 'reactions',
  });
  return reactions;
};