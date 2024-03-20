'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: Sequelize.STRING,
      image: Sequelize.STRING,
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      is_active: Sequelize.INTEGER(1),
      price: Sequelize.INTEGER,
      image: Sequelize.IMAGE,
      created_at: {
        type: Sequelize.STRING,
      },
      updated_at: {
        type: Sequelize.STRING,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todos');
  }
};
