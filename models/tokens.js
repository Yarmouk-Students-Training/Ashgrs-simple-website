'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tokens.init({
    userEmail:{
      type:DataTypes.STRING,
      primaryKey:true,
      validate:{
        isEmail:true
      }
    },
    token:{
      type:DataTypes.STRING,
      allowNull:false
    }

  }, {
    sequelize,
    tableName:'tokens',
    modelName: 'tokens',
  });
  return tokens;
};