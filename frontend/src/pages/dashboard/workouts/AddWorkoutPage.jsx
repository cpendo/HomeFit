import { Link } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import Swal from "sweetalert2";
import { useAddWorkoutMutation } from "../../../features/workouts/workoutsApi";
import WorkoutForm from "./components/WorkoutForm";

const AddWorkoutPage = () => {
  const [addWorkout, { isLoading }] = useAddWorkoutMutation();

  const handleAddWorkout = async (payload, reset) => {
    try {
      const response = await addWorkout(payload).unwrap();
      await Swal.fire("Workout saved", response.message, "success");
      reset();
    } catch (error) {
      Swal.fire("Add Workout Failed", error?.data?.message, "error");
    }
  };

  return (
    <div className="w-full pt-6 sm:pt-8 flex flex-col gap-5">
      <div>
        <Link
          to="/dashboard/workouts"
          className="inline-flex items-center gap-1 text-sm text-mute hover:text-ink transition-colors"
        >
          <IoIosArrowRoundBack className="size-5" />
          Back to workouts
        </Link>
        <h1 className="mt-2 font-secondary text-3xl sm:text-4xl tracking-tight uppercase">
          Add a new workout
        </h1>
        <p className="text-sm text-mute mt-1">
          Save a custom workout to your library — you can log it later.
        </p>
      </div>

      <div className="bg-white border border-line rounded-2xl p-5 sm:p-7">
        <WorkoutForm onSubmit={handleAddWorkout} isSubmitting={isLoading} />
      </div>
    </div>
  );
};

export default AddWorkoutPage;
