'use strict';

const { v4:uuidv4  } = require('uuid');
const moment = require('moment-timezone')
let dateToday = moment.tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:SS');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   for (let index = 0; index < 10; index++) {
    await queryInterface.bulkInsert('products', [{
      id: uuidv4() ,
      name: 'coba-'+ Math.random() * 100,
      slug: 'coba-'+ Math.random() * 100,
      price: 7000,
      is_active: 1,
      image: "images/1710896847623.PNG",
      created_at: dateToday,
      updated_at: dateToday
    }]);
   }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
