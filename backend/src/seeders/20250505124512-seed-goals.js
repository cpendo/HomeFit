"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "goals",
      [
        {
          label: "Lose Weight",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          label: "Build Muscle",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          label: "Improve Endurance",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          label: "Stay Fit",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("goals", null, {});
  },
};
