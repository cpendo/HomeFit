import { Link } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { useGetAllWorkoutsQuery } from "../../../features/workouts/workoutsApi";
import { useGetProfileQuery } from "../../../features/users/usersApi";
import { useAddWorkoutLogMutation } from "../../../features/logs/logsApi";
import Swal from "sweetalert2";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    border: "0px solid gray",
    borderRadius: "4px",
    padding: "0px",
    outline: state.isFocused ? "1px solid black" : "1px solid #99a1af",
  }),
};

const moodOptions = [
  { value: "low", label: "Low" },
  { value: "okay", label: "Okay" },
  { value: "good", label: "Good" },
  { value: "great", label: "Great" },
];

const AddLogPage = () => {
  const [selectedUnit, setSelectedUnit] = useState({
    value: "m",
    label: "Minutes",
  });

  const {
    data: { user },
  } = useGetProfileQuery();

  const { data: workouts, isLoading: isFetchingWorkouts } =
    useGetAllWorkoutsQuery();
  const [addWorkoutLog, { isLoading }] = useAddWorkoutLogMutation();

  const workoutOptions = workouts?.map((workout) => ({
    value: workout.id,
    label: workout.name,
  }));

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      id: user?.id,
      workout_id: data.workout_id?.value,
      duration_unit: selectedUnit?.value,
      mood_after: data.mood_after?.value,
      mood_before: data.mood_before?.value,
    };

    try {
      const response = await addWorkoutLog(payload).unwrap();
      reset({
        mood_before: "", // or default value like "okay"
        mood_after: "",
        performed_reps: "",
        performed_at: "",
        duration: "",
        equipment_used: "",
        effort_rating: 1, // or whatever the slider default is
        notes: "",
        workout_id: "", // if you're keeping it constant
      });
      await Swal.fire(response.message, "", "success");
    } catch (error) {
      Swal.fire("Failed!", error?.data?.message, "error");
    }

    //console.log(payload);
  };

  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        <div>
          <Link
            to="/dashboard/logs"
            className="flex flex-row items-center gap-1 text-base text-gray-500"
          >
            <IoIosArrowRoundBack className="inline text-2xl" />
            Back to logs
          </Link>
          <h4 className="text-2xl font-secondary">Add New Log</h4>
        </div>
      </div>{" "}
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-row gap-4"
        >
          {/* part 1 of the form */}
          <div className="flex-1 flex flex-col gap-4 w-full p-4 rounded-sm bg-gray-200">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Workout Name</label>
              <Controller
                name="workout_id"
                control={control}
                rules={{ required: "Workout Name is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select workout name"
                    isClearable
                    isLoading={isFetchingWorkouts}
                    options={workoutOptions}
                    styles={selectStyles}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
              {errors.workout_name && (
                <span className="text-red-600 text-sm">
                  {errors.workout_id.message}
                </span>
              )}
            </div>

            <FormInput
              label="Reps Performed"
              placeholder="3 sets of 45 secs, 2 sets of 10 , 1 full routine"
              id="performed_reps"
              register={register("performed_reps", {
                required: "Performed Reps is required",
              })}
              error={errors.performed_reps}
              styles="bg-white border-1 border-gray-400 outline-none text-base p-2 rounded-sm focus:border-black"
            />

            <FormInput
              label="Time"
              id="performed_at"
              type="datetime-local"
              register={register("performed_at", {
                required: "Time is required",
              })}
              error={errors.performed_at}
              styles="bg-white border-1 border-gray-400 outline-none text-base p-2 rounded-sm focus:border-black"
            />

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="duration">Duration</label>
              <div className="w-full flex sm:flex-row flex-col-reverse items-center gap-3">
                <input
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                  className="w-full bg-white border-1 border-gray-400 outline-none text-base p-2 rounded-sm focus:border-black"
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
              {errors.duration && (
                <span className="text-red-600 text-sm">
                  {errors.duration.message}
                </span>
              )}
            </div>

            <FormInput
              label="Equipment Used"
              id="equipment_used"
              optional={true}
              placeholder="Bodyweight, Dumbbells, Resistance Bands"
              type="text"
              register={register("equipment_used")}
              error={errors.equipment_used}
              styles="bg-white border-1 border-gray-400 outline-none text-base p-2 rounded-sm focus:border-black"
            />
          </div>

          {/* part 2 of the form */}
          <div className="flex-1 flex flex-col gap-4 w-full p-4 rounded-sm bg-gray-200">
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="">
                  Mood Before{" "}
                  <span className="text-gray-500 text-sm">(optional)</span>
                </label>
                <Controller
                  name="mood_before"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select a mood"
                      isClearable
                      options={moodOptions}
                      styles={selectStyles}
                      onChange={(val) => field.onChange(val)}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="">
                  Mood After{" "}
                  <span className="text-gray-500 text-sm">(optional)</span>
                </label>
                <Controller
                  name="mood_after"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select a mood"
                      isClearable
                      options={moodOptions}
                      styles={selectStyles}
                      onChange={(val) => field.onChange(val)}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="progress">How did this session feel? </label>
              <Controller
                control={control}
                name="effort_rating"
                defaultValue={1}
                render={({ field }) => (
                  <div className="w-full flex items-center gap-4">
                    <input
                      {...field}
                      id="effort_rating"
                      type="range"
                      min={1}
                      max={5}
                      className="w-full accent-red-secondary"
                    />
                    <span className="text-base font-secondary text-red-secondary">
                      {field.value}/5
                    </span>
                  </div>
                )}
              />
              <ul>
                <li>
                  <strong>1.</strong> Very difficult — struggled to finish
                </li>
                <li>
                  <strong>2.</strong> Hard — low energy, poor form
                </li>
                <li>
                  <strong>3.</strong> Okay — completed but not great
                </li>
                <li>
                  <strong>4.</strong> Good — solid effort, good form
                </li>
                <li>
                  <strong>5.</strong> Excellent — felt strong, hit goals
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <label htmlFor="">
                Notes <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <textarea
                {...register("notes")}
                id="notes"
                rows="3"
                placeholder="Anything you want to remember about this workout"
                className="bg-white border-1 border-gray-400 outline-none text-base p-1 rounded-sm focus:border-black"
              ></textarea>
            </div>

            <button
              disabled={isLoading}
              className="bg-red-secondary hover:bg-black text-white font-secondary text-lg py-2 rounded-sm hover:cursor-pointer"
            >
              {isLoading ? "Saving" : "Save Workout Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLogPage;
