import { useGetCategoriesQuery } from "../../../features/categories/categoriesApi";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import PropTypes from "prop-types";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    border: "0px solid gray",
    borderRadius: "4px",
    outline: state.isFocused ? "1px solid black" : "1px solid #99a1af",
  }),
};

const intensityOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const AskAISection = ({ disabled }) => {
  const {
    control,
   // register,
    handleSubmit,
    //reset,
    formState: { errors },
  } = useForm();

  const { data: categoryOptions = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h5 className="font-secondary text-2xl">Ask AI</h5>

      <fieldset
        disabled={disabled}
        className={`${disabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Workout Difficulty</label>
            <Controller
              name="difficulty"
              control={control}
              rules={{ required: "Difficulty is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select difficulty level"
                  isClearable
                  options={intensityOptions}
                  styles={selectStyles}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            {errors.difficulty && (
              <span className="text-red-600 text-sm">
                {errors.difficulty.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Workout Category</label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select workout category"
                  isLoading={isLoadingCategories}
                  isSearchable
                  isClearable
                  options={categoryOptions}
                  styles={selectStyles}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            {errors.category_id && (
              <span className="text-red-500 text-sm">
                {errors.category_id.message}
              </span>
            )}
          </div>

          <div className="w-full h-28 bg-white rounded-sm p-1">AI Response</div>

          <div className="w-full flex flex-row justify-between">
            <button className="w-40 bg-red-secondary text-white font-secondary text-lg py-2 rounded-sm">
              Get workout
            </button>
            <button className="w-40 bg-red-secondary text-white font-secondary text-lg py-2 rounded-sm">
              Regenerate
            </button>
            <button className="w-40 bg-red-secondary text-white font-secondary text-lg py-2 rounded-sm">
              Accept & Add to DB
            </button>
          </div>
        </form>
      </fieldset>
    </>
  );
};

AskAISection.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default AskAISection;
