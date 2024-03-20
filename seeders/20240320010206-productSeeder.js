'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [{
      id: 17,
      name: 'coba-'+ Math.random() * 100,
      slug: 'coba-'+ Math.random() * 100,
      price: 7000,
      is_active: 1,
      image: 1,
      phone_no: "089628642887"
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
