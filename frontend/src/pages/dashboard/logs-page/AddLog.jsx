import PropTypes from "prop-types";
import FormInput from "../components/FormInput";
import Select from "react-select";
import { useGetAllWorkoutsQuery } from "../../../features/workouts/workoutsApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAddWorkoutLogMutation } from "../../../features/logs/logsApi";
import Swal from "sweetalert2";

const selectStyles = {
  control: (base) => ({
    ...base,
    border: "0px solid black",
    borderRadius: "0px",
    outline: "1px solid black",
  }),
};


const AddLog = ({ onClose }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState({
    value: "m",
    label: "Minutes",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addWorkoutLog, { isLoading }] = useAddWorkoutLogMutation();
  const { data: workouts, isLoading: isFetchingWorkouts } =
    useGetAllWorkoutsQuery();

  const workoutOptions = workouts?.map((workout) => ({
    value: workout.id,
    label: workout.name,
  }));

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (selectedWorkout) {
      const payload = {
        ...data,
        workout_id: selectedWorkout?.value,
        duration_unit: selectedUnit?.value,
      };
     
      try {
        const response = await addWorkoutLog(payload).unwrap();
        await Swal.fire(response.message, "","success");
        onClose();
      } catch (error) {
        Swal.fire("Failed!", error?.data?.message, "error");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full sm:max-w-md max-w-fit flex flex-col gap-3 p-8 "
    >
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
          value={selectedWorkout}
          onChange={setSelectedWorkout}
          options={workoutOptions}
          styles={selectStyles}
        />
      </div>

      <FormInput
        label="Reps"
        id="reps"
        type="number"
        register={register}
        error={errors.reps}
      />

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="workout-duration" className="text-xl font-secondary">
          Duration
        </label>
        <div className="w-full flex sm:flex-row flex-col-reverse items-center gap-3">
          <input
            {...register("duration", { required: true })}
            className="w-full text-lg p-1 border-black border outline-none"
            type="number"
            id="duration"
            min={1}
            placeholder="Enter number"
          />
          <Select
            className="basic-single w-full"
            classNamePrefix="select"
            name="duration-unit"
            options={[
              { value: "s", label: "Seconds" },
              { value: "m", label: "Minutes" },
              { value: "h", label: "Hours" },
            ]}
            defaultValue={selectedUnit}
            onChange={setSelectedUnit}
            styles={selectStyles}
          />
        </div>
      </div>

      <FormInput
        label="Time"
        id="performed_at"
        type="datetime-local"
        register={register}
        error={errors.performed_at}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-red-secondary text-white py-2 font-secondary text-lg mt-5 hover:bg-black"
      >
        Add Workout Log
      </button>
      <button
        type="button"
        disabled={isLoading}
        onClick={onClose}
        className="bg-gray-500 text-white py-1 font-secondary text-lg hover:bg-black hover:text-white"
      >
        Cancel
      </button>
    </form>
  );
};

AddLog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddLog;
