import { Link } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import FormInput from "../components/FormInput";
import { selectStyles } from "../styles";
import { useState } from "react";
import { useGetAllWorkoutsQuery } from "../../../features/workouts/workoutsApi";
import { useGetProfileQuery } from "../../../features/users/usersApi";
import { useAddWorkoutLogMutation } from "../../../features/logs/logsApi";
import Swal from "sweetalert2";

const moodOptions = [
  { value: "low", label: "Low" },
  { value: "okay", label: "Okay" },
  { value: "good", label: "Good" },
  { value: "great", label: "Great" },
];

const durationUnits = [
  { value: "s", label: "Seconds" },
  { value: "m", label: "Minutes" },
  { value: "h", label: "Hours" },
];

const fieldLabel = "text-xs uppercase tracking-[0.14em] text-mute";
const baseInput =
  "bg-white border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-brand/15 transition-colors";

const AddLogPage = () => {
  const [selectedUnit, setSelectedUnit] = useState({
    value: "m",
    label: "Minutes",
  });

  const { data: profileData } = useGetProfileQuery();
  const user = profileData?.user;

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
        mood_before: "",
        mood_after: "",
        performed_reps: "",
        performed_at: "",
        duration: "",
        equipment_used: "",
        effort_rating: 1,
        notes: "",
        workout_id: "",
      });
      await Swal.fire(response.message, "", "success");
    } catch (error) {
      Swal.fire("Failed!", error?.data?.message, "error");
    }
  };

  return (
    <div className="w-full pt-6 sm:pt-8 flex flex-col gap-5">
      <div>
        <Link
          to="/dashboard/logs"
          className="inline-flex items-center gap-1 text-sm text-mute hover:text-ink transition-colors"
        >
          <IoIosArrowRoundBack className="size-5" />
          Back to logs
        </Link>
        <h1 className="mt-2 font-secondary text-3xl sm:text-4xl tracking-tight uppercase">
          Log a workout
        </h1>
        <p className="text-sm text-mute mt-1">
          Record what you did, how it felt, and keep your streak going.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 xl:grid-cols-2 gap-5"
      >
        <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
          <h2 className="font-secondary text-xl tracking-tight uppercase text-ink/80">
            The basics
          </h2>

          <div className="flex flex-col gap-1">
            <label className={fieldLabel}>Workout</label>
            <Controller
              name="workout_id"
              control={control}
              rules={{ required: "Workout is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  classNamePrefix="select"
                  placeholder="Select workout"
                  isClearable
                  isLoading={isFetchingWorkouts}
                  options={workoutOptions}
                  styles={selectStyles}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            {errors.workout_id && (
              <span className="text-brand text-xs">
                {errors.workout_id.message}
              </span>
            )}
          </div>

          <FormInput
            label="Reps performed"
            placeholder="3 sets of 45 secs, 2 sets of 10, 1 full routine"
            id="performed_reps"
            register={register("performed_reps", {
              required: "Performed reps is required",
            })}
            error={errors.performed_reps}
          />

          <FormInput
            label="When"
            id="performed_at"
            type="datetime-local"
            register={register("performed_at", {
              required: "Time is required",
            })}
            error={errors.performed_at}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="duration" className={fieldLabel}>
              Duration
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                {...register("duration", {
                  required: "Duration is required",
                })}
                className={`${baseInput} flex-1`}
                type="number"
                id="duration"
                min={1}
                placeholder="Enter number"
              />
              <div className="sm:w-36">
                <Select
                  classNamePrefix="select"
                  options={durationUnits}
                  defaultValue={selectedUnit}
                  onChange={setSelectedUnit}
                  styles={selectStyles}
                />
              </div>
            </div>
            {errors.duration && (
              <span className="text-brand text-xs">
                {errors.duration.message}
              </span>
            )}
          </div>

          <FormInput
            label="Equipment"
            id="equipment_used"
            optional
            placeholder="Bodyweight, dumbbells, resistance bands…"
            type="text"
            register={register("equipment_used")}
            error={errors.equipment_used}
          />
        </div>

        <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
          <h2 className="font-secondary text-xl tracking-tight uppercase text-ink/80">
            How it felt
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className={fieldLabel}>
                Mood before <span className="normal-case">(optional)</span>
              </label>
              <Controller
                name="mood_before"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    classNamePrefix="select"
                    placeholder="Select"
                    isClearable
                    options={moodOptions}
                    styles={selectStyles}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className={fieldLabel}>
                Mood after <span className="normal-case">(optional)</span>
              </label>
              <Controller
                name="mood_after"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    classNamePrefix="select"
                    placeholder="Select"
                    isClearable
                    options={moodOptions}
                    styles={selectStyles}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="effort_rating" className={fieldLabel}>
              How did this session feel?
            </label>
            <Controller
              control={control}
              name="effort_rating"
              defaultValue={1}
              render={({ field }) => (
                <div className="flex items-center gap-4">
                  <input
                    {...field}
                    id="effort_rating"
                    type="range"
                    min={1}
                    max={5}
                    className="flex-1 accent-brand"
                  />
                  <span className="font-secondary text-xl text-brand min-w-[44px] text-right">
                    {field.value}/5
                  </span>
                </div>
              )}
            />
            <ul className="text-xs text-mute space-y-0.5 mt-1">
              <li><span className="text-ink/70 font-medium">1</span> — Very difficult, struggled to finish</li>
              <li><span className="text-ink/70 font-medium">2</span> — Hard, low energy</li>
              <li><span className="text-ink/70 font-medium">3</span> — Okay, completed but not great</li>
              <li><span className="text-ink/70 font-medium">4</span> — Good, solid effort</li>
              <li><span className="text-ink/70 font-medium">5</span> — Excellent, felt strong</li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="notes" className={fieldLabel}>
              Notes <span className="normal-case">(optional)</span>
            </label>
            <textarea
              {...register("notes")}
              id="notes"
              rows="3"
              placeholder="Anything you want to remember about this session"
              className={baseInput}
            />
          </div>

          <button
            disabled={isLoading}
            className="mt-auto inline-flex items-center justify-center px-6 py-3 rounded-full font-medium bg-ink text-paper hover:bg-brand transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving…" : "Save log"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLogPage;
