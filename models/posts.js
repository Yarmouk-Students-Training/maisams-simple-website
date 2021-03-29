'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, reactions, comments }) {
      // define association here

      this.belongsTo(users, { foreignKey: 'username' })
      this.hasMany(reactions , {foreignKey: 'postid'})
      this.hasMany(comments , {foreignKey: 'postid'})

    }
    toJSON(){ 
      return { ...this.get(), postid: undefined}
    
    } 
  };
  posts.init({
    postid:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      unique:true

    }, 
    username:{
      type:DataTypes.STRING,
      allowNull:false

    },
    
    post_desc:{
      type:DataTypes.STRING,
      allowNull:false,

    } 
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'posts',
  });
  return posts;
};