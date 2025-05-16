"use strict";

const categories = [
  { name: "Full Body" },
  { name: "Upper Body" },
  { name: "Lower Body" },
  { name: "Core" },
  { name: "Cardio" },
  { name: "HIIT" },
  { name: "Strength" },
  { name: "Flexibility" },
  { name: "Mobility" },
  { name: "Stretching" },
  { name: "Endurance" },
  { name: "Balance" },
  { name: "Pilates" },
  { name: "Yoga" },
  { name: "Warm Up" },
  { name: "Cool Down" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();
    const categoryData = categories.map((category) => ({
      name: category.name,
      slug: category.name.toLowerCase().replace(/\s+/g, "-"),
      created_at: timestamp,
      updated_at: timestamp,
    }));

    await queryInterface.bulkInsert("categories", categoryData, {
      ignoreDuplicates: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
