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

      await Swal.fire("Add Workout Successful", response.message, "success");
      reset();
    } catch (error) {
      Swal.fire("Add Workout Failed", error?.data?.message, "error");
    }

  };

  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-3">
      {/* page header */}
      <div className="flex flex-row items-center justify-between">
        <div>
          <Link
            to="/dashboard/workouts"
            className="flex flex-row items-center gap-1 text-base text-gray-500"
          >
            <IoIosArrowRoundBack className="inline text-2xl" />
            Back to workouts
          </Link>
          <h4 className="text-2xl font-secondary">Add New Workout</h4>
        </div>
      </div>

      {/* workout form */}
      <div className="flex flex-row gap-4 ">
        <div className="flex-1 flex flex-col gap-2  w-full bg-gray-200 p-3 rounded-sm">
          <WorkoutForm onSubmit={handleAddWorkout} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutPage;
