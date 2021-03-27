'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user , comment , reaction}) {
      // define association here
      this.belongsTo(user,{foreignKey:'userEmail'})
      this.hasMany(comment,{foreignKey:'post_id'})
      this.hasMany(reaction)
    }
  };
  post.init({
    userEmail:{
      type:DataTypes.STRING,
      validate:{
        isEmail:true
      }
    },
    post_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
    },
    content:{
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};