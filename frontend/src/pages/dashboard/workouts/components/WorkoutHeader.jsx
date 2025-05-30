import { LuSettings2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const WorkoutHeader = ({
  total,
  isLoading,
  handleShowFilters,
  handleResetFilters,
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <h4 className="text-3xl font-secondary">Workouts</h4>
        {isLoading ? (
          <div className="w-full h-5 bg-gray-300 animate-pulse rounded" />
        ) : (
          <p className="text-sm text-gray-500">{total} workouts</p>
        )}
      </div>

      <div className="flex flex-row gap-2 font-secondary">
        <button
          onClick={handleResetFilters}
          className="p-2 rounded-sm hover:cursor-pointer bg-black text-white"
        >
          Reset Filters
        </button>
        <button
          disabled={isLoading}
          onClick={handleShowFilters}
          className={`p-2 rounded-sm text-black bg-gray-300 ${
            isLoading
              ? "cursor-not-allowed"
              : "hover:bg-gray-400 cursor-pointer"
          }`}
        >
          <LuSettings2 className="inline" /> Filter
        </button>

        <Link to="add">
          <button
            disabled={isLoading}
            className={`p-2 rounded-sm text-white bg-red-secondary ${
              isLoading ? "cursor-not-allowed" : "hover:bg-black"
            }`}
          >
            Add New Workout
          </button>
        </Link>
      </div>
    </div>
  );
};

WorkoutHeader.propTypes = {
  total: PropTypes.number,
  isLoading: PropTypes.bool,
  handleShowFilters: PropTypes.func,
  handleResetFilters: PropTypes.func
};

export default WorkoutHeader;
