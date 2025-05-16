"use strict";

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
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      difficulty: {
        type: Sequelize.ENUM("easy", "medium", "hard"),
        allowNull: false,
      },
      suggested_reps: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      creator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      youtube_video_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_ai_generated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.addIndex("workouts", ["difficulty"], {
      name: "difficulty_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("workouts");
  },
};
