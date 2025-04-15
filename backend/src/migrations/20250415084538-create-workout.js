"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("workouts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      creator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      difficulty_level: {
        type: Sequelize.ENUM("beginner", "intermediate", "advanced"),
        allowNull: false,
      },
      visibility: {
        type: Sequelize.ENUM("public", "private"),
        allowNull: false,
      },
    });

    // Add named foreign key constraint for category_id
    await queryInterface.addConstraint("workouts", {
      fields: ["category_id"],
      type: "foreign key",
      name: "fk_workouts_category_id",
      references: {
        table: "categories",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // Add named foreign key constraint for creator_id
    await queryInterface.addConstraint("workouts", {
      fields: ["creator_id"],
      type: "foreign key",
      name: "fk_workouts_creator_id",
      references: {
        table: "users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    //adding indexes
    await queryInterface.addIndex("workouts", ["category_id"], {
      name: "category_id_index",
    });
    await queryInterface.addIndex("workouts", ["creator_id"], {
      name: "creator_id_index",
    });
    await queryInterface.addIndex("workouts", ["difficulty_level"], {
      name: "difficulty_level_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("workouts");
  },
};
