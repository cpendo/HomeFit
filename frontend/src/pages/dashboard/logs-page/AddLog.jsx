import Proptypes from "prop-types";
import FormInput from "../components/FormInput";
import Select from "react-select";
import { useGetAllWorkoutsQuery } from "../../../features/workouts/workoutsApi";

const AddLog = ({ onClose }) => {
  const { data: workouts, isLoading: isFetchingWorkouts } =
    useGetAllWorkoutsQuery();
  console.log(workouts);

  const workoutOptions = workouts.map(workout => ({
    value: workout.id,
    label: workout.name,
  }));

  return (
    <form className="bg-white w-full sm:max-w-md max-w-fit flex flex-col gap-3 p-8 ">
      <h3 className="uppercase text-3xl text-center font-secondary mb-4">
        Add Workout Log
      </h3>

      <div className="flex flex-col gap-1">
        <label htmlFor="workout-name" className="text-xl font-secondary">
          Name
        </label>
       

        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Select Workout"
          isLoading={isFetchingWorkouts}
          isClearable
          isSearchable
          name="workouts"
          options={[...workoutOptions]}
          styles={{
            control: (base) => ({
              ...base,
              border: "0px solid black",
              borderRadius: "0px",
              outline: "1px solid black",
            }),
          }}
        />
      </div>

      <FormInput label="Reps" id="workout-reps" />

      <FormInput label="Duration" id="workout-duration" />

      <FormInput label="Time" id="workout-time" type="datetime-local" />

      <button
        type="button"
        className="bg-red-secondary text-white py-2 font-secondary text-lg mt-5 hover:bg-black"
      >
        Add Workout Log
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 text-white py-1 font-secondary text-lg hover:bg-black hover:text-white"
      >
        Cancel
      </button>
    </form>
  );
};

AddLog.propTypes = {
  onClose: Proptypes.func.isRequired,
};

export default AddLog;
