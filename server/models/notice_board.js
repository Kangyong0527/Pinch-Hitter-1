'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notice_Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Notice_Board.belongsTo(models.User, {foreignKey: 'user_id'})
      models.Notice_Board.hasMany(models.user_applicant, {foreignKey:'title'})
    }
  }
  Notice_Board.init({
    occupation: DataTypes.STRING,
    title: DataTypes.STRING,
    wage: DataTypes.STRING,
    work_date: DataTypes.STRING,
    work_place: DataTypes.STRING,
    content: DataTypes.STRING,
    // image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notice_Board',
  });
  return Notice_Board;
};