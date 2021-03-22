'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ posts, comments, reactions, friends }) {
      // define association here
      this.hasMany(posts , {foreignKey: 'username'})
      this.hasMany(comments , {foreignKey: 'username'})
      this.hasMany(reactions , {foreignKey: 'username'}) 
      this.belongsToMany(this, {through:friends ,  as: 'friendsid',foreignKey:'username'});
      
      
    }
    toJSON(){
      return{ ...this.get(), password:undefined }
    }
  };
  Users.init({
    username: { 
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true,
      validate: {

        isAlpha: true,  
        len: [5, 10],
        notNull: {
          msg: 'Please enter your name'
        }
      }
      
    },
    password:{ 
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        isNumeric: true,        
      }

    },
    userid: { 
      type:DataTypes.INTEGER,
      allowNull:false,
      
    },
    email: { 
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail: true,            

      }
    },
    country: { 
      type:DataTypes.STRING,
      allowNull:false,
    },
    gender:{ 
      type:DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    tableName:'users',
    modelName: 'Users',
  });
  return Users;
};