'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Num extends Model {
    static associate(models) {
      Num.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }
  Num.init({
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Num',
  });
  return Num;
};