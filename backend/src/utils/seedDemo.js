// Seeds a demo user, categories, goals, workouts, and recent workout logs
// when the database is empty. Designed to be safe to call on every startup.

const {
  User,
  Category,
  Workout,
  WorkoutLogs,
  UserProfile,
  Goal,
} = require("../models");

const CATEGORIES = [
  "Full Body",
  "Upper Body",
  "Lower Body",
  "Core",
  "Cardio",
  "HIIT",
  "Strength",
  "Flexibility",
  "Mobility",
  "Stretching",
  "Endurance",
  "Balance",
  "Pilates",
  "Yoga",
  "Warm Up",
  "Cool Down",
];

const GOALS = [
  "Lose Weight",
  "Build Muscle",
  "Improve Endurance",
  "Stay Fit",
];

const WORKOUTS = [
  {
    name: "Push Ups",
    description:
      "A classic upper body workout that targets the chest, shoulders, and triceps.",
    difficulty: "easy",
    categorySlug: "upper-body",
    suggested_reps: "3 sets of 15",
  },
  {
    name: "Sit Ups",
    description:
      "Strengthen your abdominal muscles with this core-focused move.",
    difficulty: "easy",
    categorySlug: "core",
    suggested_reps: "3 sets of 20",
  },
  {
    name: "Squats",
    description:
      "A lower body staple that builds strength in glutes, quads, and hamstrings.",
    difficulty: "easy",
    categorySlug: "lower-body",
    suggested_reps: "3 sets of 20",
  },
  {
    name: "Plank",
    description:
      "A full-body isometric exercise that improves core stability and strength.",
    difficulty: "medium",
    categorySlug: "core",
    suggested_reps: "3 sets of 45 seconds",
  },
  {
    name: "Jumping Jacks",
    description:
      "A classic cardio move that elevates heart rate and warms up the body.",
    difficulty: "easy",
    categorySlug: "cardio",
    suggested_reps: "3 sets of 30",
  },
  {
    name: "Burpees",
    description:
      "A full-body HIIT staple that builds strength and explosive endurance.",
    difficulty: "hard",
    categorySlug: "hiit",
    suggested_reps: "3 sets of 10",
  },
  {
    name: "Lunges",
    description:
      "A lower-body move that strengthens legs and improves balance.",
    difficulty: "easy",
    categorySlug: "lower-body",
    suggested_reps: "3 sets of 12 per leg",
  },
  {
    name: "Mountain Climbers",
    description:
      "A dynamic core and cardio exercise. Great for warm-ups or HIIT circuits.",
    difficulty: "medium",
    categorySlug: "cardio",
    suggested_reps: "3 sets of 40 seconds",
  },
];

const slugify = (name) => name.toLowerCase().replace(/\s+/g, "-");

const seedDemo = async () => {
  const existingUser = await User.count();
  if (existingUser > 0) {
    console.log("Seed: skipped (database already has users).");
    return;
  }

  console.log("Seed: empty database detected — seeding demo data...");

  // 1. Goals
  await Goal.bulkCreate(
    GOALS.map((label) => ({ label })),
    { ignoreDuplicates: true }
  );

  // 2. Categories
  await Category.bulkCreate(
    CATEGORIES.map((name) => ({ name, slug: slugify(name) })),
    { ignoreDuplicates: true }
  );

  // 3. Demo user (bcrypt hook hashes password automatically)
  const demoUser = await User.create({
    first_name: "demo",
    last_name: "user",
    email: "demo@homefit.app",
    password: "demo1234",
    is_verified: true,
    role: "member",
  });

  // 4. User profile for demo user
  const staFit = await Goal.findOne({ where: { label: "Stay Fit" } });
  await UserProfile.create({
    user_id: demoUser.id,
    weight: 70,
    height: 170,
    age: 28,
    goal_id: staFit.id,
  });

  // 5. Workouts (created by demo user)
  const categoriesBySlug = {};
  const cats = await Category.findAll();
  cats.forEach((c) => (categoriesBySlug[c.slug] = c.id));

  const workoutRecords = await Workout.bulkCreate(
    WORKOUTS.map((w) => ({
      name: w.name,
      description: w.description,
      difficulty: w.difficulty,
      category_id: categoriesBySlug[w.categorySlug],
      suggested_reps: w.suggested_reps,
      creator_id: demoUser.id,
      youtube_video_id: "",
    })),
    { ignoreDuplicates: true }
  );

  // 6. Pre-logged workouts for the demo user — last few days, varied mood/effort
  const now = new Date();
  const daysAgo = (n) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000);

  const logs = [
    {
      workout: "Push Ups",
      daysAgo: 1,
      performed_reps: "3 sets of 15",
      duration: 600,
      equipment_used: "Bodyweight",
      effort_rating: 4,
      mood_before: "okay",
      mood_after: "good",
      notes: "Solid session, controlled tempo.",
    },
    {
      workout: "Squats",
      daysAgo: 1,
      performed_reps: "3 sets of 25",
      duration: 720,
      equipment_used: "Bodyweight",
      effort_rating: 5,
      mood_before: "low",
      mood_after: "great",
      notes: "Pushed past my usual count.",
    },
    {
      workout: "Plank",
      daysAgo: 2,
      performed_reps: "3 sets of 60 seconds",
      duration: 480,
      equipment_used: "Yoga mat",
      effort_rating: 3,
      mood_before: "okay",
      mood_after: "good",
      notes: "Held longer than last week.",
    },
    {
      workout: "Jumping Jacks",
      daysAgo: 3,
      performed_reps: "3 sets of 40",
      duration: 300,
      effort_rating: 2,
      mood_before: "good",
      mood_after: "great",
      notes: "Quick warm-up before run.",
    },
    {
      workout: "Burpees",
      daysAgo: 4,
      performed_reps: "3 sets of 12",
      duration: 480,
      equipment_used: "Bodyweight",
      effort_rating: 5,
      mood_before: "okay",
      mood_after: "good",
      notes: "Brutal but worth it.",
    },
    {
      workout: "Lunges",
      daysAgo: 5,
      performed_reps: "3 sets of 14 per leg",
      duration: 540,
      effort_rating: 4,
      mood_before: "good",
      mood_after: "great",
    },
    {
      workout: "Mountain Climbers",
      daysAgo: 7,
      performed_reps: "3 sets of 50 seconds",
      duration: 360,
      effort_rating: 4,
    },
  ];

  const workoutsByName = {};
  workoutRecords.forEach((w) => (workoutsByName[w.name] = w.id));

  await WorkoutLogs.bulkCreate(
    logs.map((l) => ({
      user_id: demoUser.id,
      workout_id: workoutsByName[l.workout],
      performed_reps: l.performed_reps,
      duration: l.duration,
      performed_at: daysAgo(l.daysAgo),
      effort_rating: l.effort_rating,
      mood_before: l.mood_before ?? null,
      mood_after: l.mood_after ?? null,
      notes: l.notes ?? null,
    }))
  );

  console.log(
    `Seed complete: demo user (demo@homefit.app / demo1234), ${WORKOUTS.length} workouts, ${logs.length} logs.`
  );
};

module.exports = seedDemo;
