'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post , comment}) {
      // define association here
      this.belongsTo(post)
      this.belongsTo(comment)
    }
  };
  reaction.init({
    reaction_type:{
      type: DataTypes.STRING,
      defaultValue:"Like"
    }
  }, {
    sequelize,
    modelName: 'reaction',
  });
  return reaction;
};