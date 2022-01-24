'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notice_Boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },      
      title: {
        unique: true,
        type: Sequelize.STRING
      },
      occupation:{
        type:Sequelize.STRING
      },
      wage: {
        type: Sequelize.STRING
      },
      work_date: {
        type: Sequelize.STRING
      },
      work_place: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notice_Boards');
  }
};