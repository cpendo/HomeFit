import { Link, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Swal from "sweetalert2";
import WorkoutForm from "./components/WorkoutForm";
import {
  useGetWorkoutByIdQuery,
  useUpdateWorkoutMutation,
} from "../../../features/workouts/workoutsApi";

const UpdateWorkoutPage = () => {
  const { id } = useParams();
  const { data: workout, isLoading } = useGetWorkoutByIdQuery(id);
  const [updateWorkout, { isLoading: isUpdating }] = useUpdateWorkoutMutation();

  const handleUpdateWorkout = async (payload) => {
    const result = await Swal.fire({
      title: "Do you want to update this workout?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) {
      Swal.fire("Workout not updated", "", "info");
      return;
    }

    try {
      const response = await updateWorkout({ id, ...payload }).unwrap();
      await Swal.fire("Workout Updated", response.message, "success");
    } catch (err) {
      Swal.fire("Update Failed", err?.data?.message, "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;

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
          <h4 className="text-2xl font-secondary">Update Workout</h4>
        </div>
      </div>

      {/* workout form */}
      <div className="flex flex-row gap-4 ">
        <div className="flex-1 flex flex-col gap-2  w-full bg-gray-200 p-3 rounded-sm">
          <WorkoutForm
            defaultValues={workout}
            onSubmit={handleUpdateWorkout}
            isLoading={isUpdating}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateWorkoutPage;
