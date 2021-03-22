'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
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
  };
  comments.init({
    commentid:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,

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