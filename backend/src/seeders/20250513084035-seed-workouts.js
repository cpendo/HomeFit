"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "workouts",
      [
        {
          name: "Push Ups",
          description:
            "A classic upper body workout that targets the chest, shoulders, and triceps.",
          difficulty: "easy",
          category_id: 2, // Upper Body
          suggested_reps: "3 sets of 15",
          creator_id: 2,
          youtube_video_id: "",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sit Ups",
          description:
            "Strengthen your abdominal muscles with this core-focused move.",
          difficulty: "easy",
          category_id: 4, // Core
          suggested_reps: "3 sets of 20",
          creator_id: 2,
          youtube_video_id: "",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Squats",
          description:
            "A lower body staple that builds strength in glutes, quads, and hamstrings.",
          difficulty: "easy",
          category_id: 3, // Lower Body
          suggested_reps: "3 sets of 20",
          creator_id: 2,
          youtube_video_id: "",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Plank",
          description:
            "A full-body isometric exercise that improves core stability and strength.",
          difficulty: "medium",
          category_id: 4, // Core
          suggested_reps: "3 sets of 45 seconds",
          creator_id: 2,
          youtube_video_id: "",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Jumping Jacks",
          description:
            "A classic cardio move that elevates heart rate and warms up the body.",
          difficulty: "easy",
          category_id: 5, // Cardio
          suggested_reps: "3 sets of 30",
          creator_id: 2,
          youtube_video_id: "",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("workouts", null, {});
  },
};
