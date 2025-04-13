const User = require("./userModel");
const Category = require("./categoryModel");
const Workout = require("./workoutModel");

Category.hasMany(Workout, { foreignKey: 'category_id', as: 'workouts' });
User.hasMany(Workout, { foreignKey: "creator_id", as: "workouts" });
Workout.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Workout.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });


module.exports = {User, Category, Workout}