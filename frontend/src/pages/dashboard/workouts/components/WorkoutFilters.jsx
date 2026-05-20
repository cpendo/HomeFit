import Select from "react-select";
import { selectStyles } from "../../styles";
import { useGetCategoriesQuery } from "../../../../features/categories/categoriesApi";
import PropTypes from "prop-types";

const intensityOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const WorkoutFilters = ({ showFilters, filters, onUpdate, handleFilters }) => {
  const { data: categoryOptions = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        showFilters ? "max-h-[260px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="flex flex-row flex-wrap gap-4 p-4 sm:p-5 bg-white border border-line rounded-xl items-end">
        <div className="flex flex-col gap-1 min-w-[220px]">
          <label className="text-xs uppercase tracking-[0.14em] text-mute">
            Workout name
          </label>
          <input
            type="text"
            placeholder="Search workout name"
            className="px-3 py-2 rounded-lg bg-white border border-line focus:border-ink focus:ring-2 focus:ring-brand/15 outline-none transition-colors"
            value={filters.search}
            onChange={(e) => onUpdate("search", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 min-w-[200px]">
          <label className="text-xs uppercase tracking-[0.14em] text-mute">
            Category
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="All categories"
            isLoading={isLoadingCategories}
            isSearchable
            isClearable
            options={categoryOptions}
            styles={selectStyles}
            menuPortalTarget={document.body}
            menuPosition="absolute"
            value={
              categoryOptions.find((opt) => opt.value === filters.category) ||
              null
            }
            onChange={(selected) => onUpdate("category", selected?.value || "")}
          />
        </div>

        <div className="flex flex-col gap-1 min-w-[180px]">
          <label className="text-xs uppercase tracking-[0.14em] text-mute">
            Difficulty
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Any difficulty"
            isClearable
            options={intensityOptions}
            styles={selectStyles}
            menuPortalTarget={document.body}
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

        <button
          disabled={isLoadingCategories}
          onClick={handleFilters}
          className="px-5 py-2 rounded-full text-sm font-medium bg-ink text-paper hover:bg-brand transition-colors disabled:opacity-50"
        >
          Apply filters
        </button>
      </div>
    </div>
  );
};

WorkoutFilters.propTypes = {
  showFilters: PropTypes.bool,
  filters: PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    search: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
  handleFilters: PropTypes.func,
};

export default WorkoutFilters;
