const User = require("./userModel");
const Category = require("./categoryModel");
const Workout = require("./workoutModel");
const WorkoutLogs = require("./workoutLogsModel");
const { Set, SetWorkout } = require("./setModel");
const {UserProfile, Goal} = require("./userProfileModel");

Category.hasMany(Workout, { foreignKey: 'category_id', as: 'workouts' });
User.hasMany(Workout, { foreignKey: "creator_id", as: "workouts" });
Workout.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Workout.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });
WorkoutLogs.belongsTo(User, {foreignKey: "user_id", as: 'user'});
WorkoutLogs.belongsTo(Workout, {foreignKey: "workout_id", as: "workouts"});
Set.belongsTo(User, { foreignKey: "creator_id" });
SetWorkout.belongsTo(Set, { foreignKey: "set_id" });
SetWorkout.belongsTo(Workout, { foreignKey: "workout_id" });
UserProfile.belongsTo(User, {foreignKey: "user_id", as: "user" });
User.hasOne(UserProfile, {foreignKey: "user_id", as: "profile"});
UserProfile.belongsTo(Goal, { foreignKey: "goal_id", as: "goal" });
Goal.hasMany(UserProfile, { foreignKey: "goal_id", as: "userProfiles" });

module.exports = {User, Category, Workout, WorkoutLogs, Set, SetWorkout, UserProfile, Goal}