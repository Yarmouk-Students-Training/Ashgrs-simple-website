'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post , comment,friendship }) {
      // define association here
      this.hasMany(post , {foreignKey:"userEmail"});
      this.hasMany(comment , {foreignKey:"userEmail"});
      this.belongsToMany(this,{through:friendship,as:'sender' ,foreignKey:'reciver'})
    } 
  };
  user.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      isAlpha: true
    },
    userEmail:{
      type:DataTypes.STRING,
      primaryKey:true,
      validate:{
        isEmail:true
      }
    },
    hashedPassword:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    country:{
      type:DataTypes.STRING,
      validate:{
        isAlpha: true,
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};