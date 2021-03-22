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
    static associate({post , comment,friendship}) {
      // define association here
      this.hasMany(post);
      this.hasMany(comment);
      this.belongsToMany(this,{through:friendship,as:'sender' ,foreignKey:'reciver'})
    }
  };
  user.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      primaryKey:true,
      allowNull:false,
      validate:{
        isEmail:true
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};