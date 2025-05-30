import Select from "react-select";
import { selectStyles } from "../../styles";
import { useGetCategoriesQuery } from "../../../../features/categories/categoriesApi";
import PropTypes from "prop-types";

const intensityOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const LogFilters = ({ showFilters, filters, onUpdate, handleFilters }) => {
  const { data: categoryOptions = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        showFilters ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="flex flex-row flex-wrap gap-6 p-4 bg-gray-100 rounded-sm items-end">
        {/* Date Range */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">From</label>
          <input
            type="date"
            className="p-2 rounded-sm border border-gray-300"
            value={filters.dateFrom}
            onChange={(e) => onUpdate("dateFrom", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">To</label>
          <input
            type="date"
            className="p-2 rounded-sm border border-gray-300"
            value={filters.dateTo}
            onChange={(e) => onUpdate("dateTo", e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Category</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select workout category"
            isLoading={isLoadingCategories}
            isSearchable
            isClearable
            options={categoryOptions}
            styles={selectStyles}
            menuPortalTarget={document.body} // moves the dropdown to body
            menuPosition="absolute"
            value={
              categoryOptions.find((opt) => opt.value === filters.category) ||
              null
            }
            onChange={(selected) => onUpdate("category", selected?.value || "")}
          />
        </div>

        {/* Difficulty */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Difficulty</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select difficulty level"
            isClearable
            options={intensityOptions}
            styles={selectStyles}
            menuPortalTarget={document.body} // moves the dropdown to body
            menuPosition="absolute"
            value={
              intensityOptions.find(
                (opt) => opt.value === filters.difficulty
              ) || null
            }
            onChange={(selected) =>
              onUpdate("difficulty", selected?.value || "")
            }
          />
        </div>

        {/* Search Button */}

        <button
          disabled={isLoadingCategories}
          onClick={handleFilters}
          className={`p-2 rounded-sm bg-red-secondary text-white hover:bg-black ${
            isLoadingCategories ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

LogFilters.propTypes = {
  showFilters: PropTypes.bool,
  filters: PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
  handleFilters: PropTypes.func,
};

export default LogFilters;
