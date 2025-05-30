import { LuSettings2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LogHeader = ({
  total,
  isLoading,
  handleShowFilters,
  handleResetFilters,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <h4 className="text-3xl font-secondary">Logs</h4>
        {isLoading ? (
          <div className="w-full h-5 bg-gray-300 animate-pulse rounded"></div>
        ) : (
          <p className="text-sm text-gray-500">{total} logs</p>
        )}{" "}
      </div>

      {/* buttons */}
      <div className="flex flex-row gap-2 font-secondary">
        <button
          //   onClick={() => {
          //     resetFilters(), setShowFilters(false);
          //   }}
          onClick={handleResetFilters}
          className="p-2 rounded-sm hover:cursor-pointer bg-black text-white"
        >
          Reset Filters
        </button>

        <button
          //   onClick={() => {
          //     setShowFilters(!showFilters), clearFilters();
          //   }}
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
              isLoading ? "cursor-not-allowed" : "cursor-pointer hover:bg-black"
            }`}
          >
            Add New Log
          </button>
        </Link>
      </div>
    </div>
  );
};

LogHeader.propTypes = {
  total: PropTypes.number,
  isLoading: PropTypes.bool,
  handleShowFilters: PropTypes.func,
  handleResetFilters: PropTypes.func,
};

export default LogHeader;
