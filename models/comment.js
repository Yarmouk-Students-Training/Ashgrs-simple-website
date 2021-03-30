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
      this.belongsTo(user,{foreignKey:'userEmail'})
      this.belongsTo(post,{foreignKey:'post_id'})
      this.hasMany(reaction)
      
    }
  };
  comment.init({
    post_id:{
      type:DataTypes.INTEGER,
      allowNull: false
      // autoIncrement:true,
    },
    userEmail:{
      type: DataTypes.STRING,
      allowNull: false
    },
    comment_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    body:{
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};