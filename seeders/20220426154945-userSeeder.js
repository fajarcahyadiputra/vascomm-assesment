'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'admin',
      password: await bcrypt.hash('12345678', 10),
      email: "admin@gmail.com",
      is_active: 1,
      phone_no: "089628642887"
    }]);
    await queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'user',
      password: await bcrypt.hash('12345678', 10),
      email: "user@gmail.com",
      is_active: 1,
      phone_no: "089628642887"
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
