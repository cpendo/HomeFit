import { LuSettings2, LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const WorkoutHeader = ({
  total,
  isLoading,
  handleShowFilters,
  handleResetFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="font-secondary text-3xl sm:text-4xl tracking-tight uppercase">
          Workouts
        </h1>
        {isLoading ? (
          <div className="w-32 h-4 bg-line animate-pulse rounded mt-1" />
        ) : (
          <p className="text-sm text-mute mt-1">
            {total} {total === 1 ? "workout" : "workouts"} in your library
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 rounded-full text-sm font-medium border border-line text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          Reset
        </button>
        <button
          disabled={isLoading}
          onClick={handleShowFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-line text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
        >
          <LuSettings2 className="size-4" />
          Filter
        </button>
        <Link to="add">
          <button
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-brand text-paper hover:bg-brand-dark transition-colors disabled:opacity-50"
          >
            <LuPlus className="size-4" />
            New workout
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
  handleResetFilters: PropTypes.func,
};

export default WorkoutHeader;
