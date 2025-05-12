import { Link } from "react-router";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import Select from "react-select";

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

const AddWorkoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("submitted", data);
  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="text-3xl font-secondary">Add New Workout</h4>
          <Link to="/dashboard/workouts" className="text-sm text-gray-500">
            Back to workouts
          </Link>
        </div>
        {/* row.year */}
        <div className="flex flex-row gap-2 font-secondary">
          <button className="bg-red-secondary text-white p-2 rounded-sm">
            Use AI
          </button>
        </div>
      </div>{" "}
      <div className="flex flex-row gap-4 ">
        <div className="flex-1 flex flex-col gap-2  w-full bg-gray-200 p-3 rounded-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col gap-3 "
          >
 
            <FormInput
              label="Workout Name"
              id="name"
              type="text"
              register={register("name", {
                required: "Name is required",
              })}
              error={errors.name}
              styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
            />

            <div className="flex flex-row gap-3">
              <FormInput
                label="Youtube Video ID"
                id="demo_id"
                type="text"
                register={register("demo_id")}
                error={errors.demo_id}
                styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
              />
              <FormInput
                label="Reps"
                id="reps"
                type="number"
                register={register("reps")}
                error={errors.reps}
                styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Workout Difficulty</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable
                name="color"
                options={intensityOptions}
               
                styles={selectStyles}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Workout Category</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable
                isClearable
                name="color"
                options={intensityOptions}
              
                styles={selectStyles}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="">
                Workout Description{" "}
                <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows="2"
                className="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
              ></textarea>
            </div>

            <button
              type="button"
              className="bg-red-secondary text-white font-secondary text-lg py-2 rounded-sm"
            >
              Save Workout
            </button>
          </form>
        </div>

        <div className="flex-1 flex flex-col gap-3  w-full bg-gray-200 p-3 rounded-sm">
          <h5 className="font-secondary text-2xl">Ask AI</h5>

          <form className="flex flex-col gap-3">
          

            <FormInput
              label="Workout Name"
              id="name"
              type="text"
              register={register("name", {
                required: "Name is required",
              })}
              error={errors.name}
              styles="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
            />

            <div className="flex flex-col gap-1">
              <label htmlFor="">Workout Difficulty</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable
                name="color"
                options={intensityOptions}
                               styles={selectStyles}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Workout Category</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable
                isClearable
                name="color"
                options={intensityOptions}
                // value={selectedGoal}
                // onChange={setSelectedGoal}
                styles={selectStyles}
              />
            </div>


            <div className="w-full h-28 bg-white rounded-sm p-1">
              AI Response
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutPage;
