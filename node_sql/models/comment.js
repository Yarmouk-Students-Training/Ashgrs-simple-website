'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user,post,reaction}) {
      this.belongsTo(user)
      this.belongsTo(post)
      this.hasMany(reaction)
    }
  };
  comment.init({
    comment_id:{
      type:DataTypes.STRING,
      primaryKey:true
    },
    body:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};