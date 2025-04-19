'use strict';
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

module.exports = {
  async up (queryInterface, Sequelize) {
    const csvFilePath = path.join(__dirname, "./data/workouts.csv");
    const workouts = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
          workouts.push({
            name: row.name,
            category_id: parseInt(row.category_id),
            creator_id: parseInt(row.creator_id),
            difficulty_level: row.difficulty_level,
            visibility: row.visibility,
            created_at: new Date(),
            updated_at: new Date(),
          });
        })
        .on("end", async () => {
          try {
            await queryInterface.bulkInsert("workouts", workouts, {
              ignoreDuplicates: true,
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        });
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("workouts", null, {});
  }
};
