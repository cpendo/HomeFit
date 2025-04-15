import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";
import PropTypes from "prop-types";

const Filter = ({
  categoryOptions,
  selectedOptions,
  setSelectedOptions,
  intensityOptions,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex flex-row items-center">
        <input
          type="text"
          className="lg:w-75 w-full bg-white py-2 px-2 md:px-4 focus:outline-none"
        />
        <button className="bg-black p-2 cursor-pointer hover:bg-red-primary">
          <IoSearchOutline className="text-2xl text-white" />
        </button>
      </div>

      <Select
        name="intensity"
        className="basic-single w-full md:w-60 outline-none"
        classNamePrefix="select"
        placeholder="Choose intensity"
        options={intensityOptions}
        isClearable={true}
      />

      <Select
        name="categories"
        placeholder="Choose category"
        className="basic-multi-select w-full md:w-80 outline-none"
        classNamePrefix="select"
        value={selectedOptions}
        onChange={(e) => setSelectedOptions(e)}
        options={categoryOptions.map((option) => ({
          ...option,
          isDisabled: selectedOptions.length >= 2,
        }))}
        isClearable={true}
        isSearchable={true}
        isMulti
      />
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
  selectedOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
  intensityOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Filter;
