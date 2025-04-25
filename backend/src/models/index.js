const User = require("./userModel");
const Category = require("./categoryModel");
const Workout = require("./workoutModel");
const WorkoutLogs = require("./workoutLogsModel");

Category.hasMany(Workout, { foreignKey: 'category_id', as: 'workouts' });
User.hasMany(Workout, { foreignKey: "creator_id", as: "workouts" });
Workout.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Workout.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });
WorkoutLogs.belongsTo(User, {foreignKey: "user_id", as: 'user'});
WorkoutLogs.belongsTo(Category, {foreignKey: "workout_id", as: "workouts"});

module.exports = {User, Category, Workout, WorkoutLogs} 