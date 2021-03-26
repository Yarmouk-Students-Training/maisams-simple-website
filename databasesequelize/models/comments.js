'use strict';
const {Model} = require('sequelize');
const friends = require('./friends');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, posts }) {
      // define association here
      this.belongsTo(users, { foreignKey: 'username' })
      this.belongsTo(posts, { foreignKey: 'postid' })



    }
    toJSON(){ 
      return { ...this.get(), commentid: undefined}
    
    } 
  };
  comments.init({
    commentid:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      unique:true

    },

    postid:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false
    },
    comment_desc:{
       type: DataTypes.STRING,
       allowNull:false,
    }
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'comments',
  });
  return comments;
};