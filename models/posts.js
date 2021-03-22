'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, reactions, comments }) {
      // define association here

      this.belongsTo(Users, { foreignKey: 'username' })
      this.hasOne(reactions , {foreignKey: 'postid'})
      this.hasMany(comments , {foreignKey: 'postid'})



      

    }
  };
  posts.init({
    postid:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,

    }, 
    
    post_desc:{
      type:DataTypes.STRING,
      allowNull:false,

    } 
  }, {
    sequelize,
    tableName: 'Posts',
    modelName: 'posts',
  });
  return posts;
};