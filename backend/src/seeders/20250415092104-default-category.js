"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Strength",
        },
        {
          name: "Cardio",
        },
        {
          name: "Flexibility",
        },
        {
          name: "Balance",
        },
        {
          name: "Pilates",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
