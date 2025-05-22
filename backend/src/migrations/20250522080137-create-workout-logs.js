"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("workout_logs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      workout_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      performed_reps: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      performed_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      equipment_used: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      mood_before: {
        type: Sequelize.ENUM("low", "okay", "good", "great"),
        allowNull: true,
      },
      mood_after: {
        type: Sequelize.ENUM("low", "okay", "good", "great"),
        allowNull: true,
      },
      effort_rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add foreign key constraints
    await queryInterface.addConstraint("workout_logs", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_workout_logs_user_id",
      references: {
        table: "users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint("workout_logs", {
      fields: ["workout_id"],
      type: "foreign key",
      name: "fk_workout_logs_workout_id",
      references: {
        table: "workouts",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addIndex("workout_logs", ["user_id"], {
      name: "user_id_index",
    });

    await queryInterface.addIndex("workout_logs", ["workout_id"], {
      name: "workout_id_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("workout_logs");
  },
};
