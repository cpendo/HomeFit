import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";
import PropTypes from "prop-types";
import { useState } from "react";

const Filter = ({
  categoryOptions,
  selectedOptions,
  intensityOptions,
  selectedIntensity,
  searchTerm,
  setSearchParams,
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [localIntensity, setLocalIntensity] = useState(selectedIntensity);
  const [localCategories, setLocalCategories] = useState(
    selectedOptions.map(cat => ({ value: cat, label: cat }))
  );

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (localSearch) params.set("search", localSearch);
    if (localIntensity) params.set("difficulty", localIntensity);
    if (localCategories.length) {
      localCategories.forEach((cat) => params.append("category", cat.value));
    }
    params.set("page", "1"); // reset page to 1

    setSearchParams(params);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex flex-row items-center">
        <input
          type="text"
          className="lg:w-75 w-full bg-white py-2 px-2 md:px-4 focus:outline-none"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        <button className="bg-black p-2 cursor-pointer hover:bg-red-primary">
          <IoSearchOutline className="text-2xl text-white" />
        </button>
      </div>

      <Select
        name="intensity"
        className="basic-single w-full md:w-80 outline-none"
        placeholder="Choose intensity"
        options={intensityOptions}
        value={intensityOptions.find((option) => option.value === localIntensity)}
        onChange={(e) => setLocalIntensity(e?.value || "")}
        isClearable
      />

      <Select
        name="categories"
        placeholder="Choose category"
        className="basic-multi-select w-full md:w-80 outline-none"
        classNamePrefix="select"
        value={localCategories}
        onChange={(e) => setLocalCategories(e || [])}
        options={categoryOptions.map((option) => ({
          ...option,
          isDisabled: localCategories.length >= 2,
        }))}
        isClearable
        isSearchable
        isMulti
      />

      <button
        className="bg-black text-white py-2 px-4 rounded"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

Filter.propTypes = {
  categoryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  intensityOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedIntensity: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};

export default Filter;