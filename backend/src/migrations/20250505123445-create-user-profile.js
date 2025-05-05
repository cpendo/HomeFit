"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_profiles", {
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
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goal_id: {
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

    await queryInterface.addConstraint("user_profiles", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_profile_user_id",
      references: {
        table: "users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint("user_profiles", {
      fields: ["user_id"],
      type: "unique",
      name: "unique_profile_per_user",
    });

    await queryInterface.addConstraint("user_profiles", {
      fields: ["goal_id"],
      type: "foreign key",
      name: "fk_profile_goal_id",
      references: {
        table: "goals",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addIndex("user_profiles", ["user_id"], {
      name: "user_id_index",
    });
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_profiles");
  },
};
