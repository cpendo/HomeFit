import PropTypes from "prop-types";
import Select from "react-select";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import { useGetAllWorkoutsQuery } from "../../../features/workouts/workoutsApi";
import { useState } from "react";

const selectStyles = {
  control: (base) => ({
    ...base,
    border: "0px solid black",
    borderRadius: "0px",
    outline: "1px solid black",
  }),
};

const AddSet = ({ onClose }) => {
  const { data: workouts, isLoading: isFetchingWorkouts } =
    useGetAllWorkoutsQuery();

  const workoutOptions = workouts?.map((workout) => ({
    value: workout.id,
    label: workout.name,
  }));

  const [selectedWorkout, setSelectedWorkout] = useState([]);
  const [repsMap, setRepsMap] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleRepsChange = (id, value) => {
    setRepsMap((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmit = (data) => {
    const selected = selectedWorkout.map((w) => ({
      workout_id: w.value,
      reps: Number(repsMap[w.value]) || 0,
    }));

    const payload = {
      name: data.name,
      description: data.description,
      workouts: selected,
    };
    console.log(payload);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full sm:max-w-md max-w-fit flex flex-col gap-3 p-8 "
    >
      <h3 className="uppercase text-3xl text-center font-secondary mb-4">
        Add Workout Log
      </h3>

      <FormInput
        label="Name"
        id="name"
        register={register}
        error={errors.name}
      />
      <FormInput
        label="Description"
        id="description"
        register={register}
        error={errors.name}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="workout-name" className="text-xl font-secondary">
          Set Workout(s)
        </label>

        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Select Workout"
          isLoading={isFetchingWorkouts}
          isClearable
          isSearchable
          isMulti
          name="workouts"
          value={selectedWorkout}
          onChange={(e) => setSelectedWorkout(e || [])}
          options={workoutOptions?.map((option) => ({
            ...option,
            isDisabled: selectedWorkout.length >= 4,
          }))}
          styles={selectStyles}
        />
      </div>

      {selectedWorkout.length > 0 && (
        <div className="w-full flex flex-col gap-2 mt-2">
          {selectedWorkout.map((workout) => (
            <div key={workout.value} className="w-full flex items-center justify-between">
              <label className="font-secondary">
                {workout.label} Reps:
              </label>
              <input
                type="number"
                min="1"
                defaultValue={1}
                value={repsMap[workout.value] || ""}
                onChange={(e) =>
                  handleRepsChange(workout.value, e.target.value)
                }
                className="border-1 border-black outline-none px-2 py-1 w-32"
                required
              />
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        //disabled={isLoading}
        
        className="bg-red-secondary text-white py-2 font-secondary text-lg mt-5 hover:bg-black"
      >
        Add Set
      </button>
      <button
        type="button"
        //disabled={isLoading}
        onClick={onClose}
        className="bg-gray-500 text-white py-1 font-secondary text-lg hover:bg-black hover:text-white"
      >
        Cancel
      </button>
    </form>
  );
};

AddSet.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddSet;
