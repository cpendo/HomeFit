"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("set_workouts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      set_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      workout_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reps: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });

    await queryInterface.addConstraint("set_workouts", {
      fields: ["set_id"],
      type: "foreign key",
      name: "fk_set_id",
      references: {
        table: "sets",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("set_workouts", {
      fields: ["workout_id"],
      type: "foreign key",
      name: "fk_workout_id",
      references: {
        table: "workouts",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("set_workouts");
  },
};
