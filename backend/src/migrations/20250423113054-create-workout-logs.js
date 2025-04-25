'use strict';

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
      rep: {
        type: Sequelize.INTEGER,
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

    // Add named foreign key constraint for user_id
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

    //Add named foreign key constraint for workout_id
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

    //adding indexes
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