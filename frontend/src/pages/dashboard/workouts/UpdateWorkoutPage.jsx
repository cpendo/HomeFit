import { Link, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Swal from "sweetalert2";
import WorkoutForm from "./components/WorkoutForm";
import {
  useGetWorkoutByIdQuery,
  useUpdateWorkoutMutation,
} from "../../../features/workouts/workoutsApi";
import SkeletonDetailsPage from "./components/SkeletonDetailsSection";

const UpdateWorkoutPage = () => {
  const { id } = useParams();
  const { data: workout, isLoading } = useGetWorkoutByIdQuery(id);
  const [updateWorkout, { isLoading: isUpdating }] = useUpdateWorkoutMutation();

  const handleUpdateWorkout = async (payload) => {
    const result = await Swal.fire({
      title: "Save changes to this workout?",
      showCancelButton: true,
      confirmButtonText: "Yes, save",
    });
    if (!result.isConfirmed) {
      Swal.fire("Changes discarded", "", "info");
      return;
    }
    try {
      const response = await updateWorkout({ id, ...payload }).unwrap();
      await Swal.fire("Workout updated", response.message, "success");
    } catch (err) {
      Swal.fire("Update Failed", err?.data?.message, "error");
    }
  };

  if (isLoading) return <SkeletonDetailsPage />;

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
          Update workout
        </h1>
      </div>

      <div className="bg-white border border-line rounded-2xl p-5 sm:p-7">
        <WorkoutForm
          defaultValues={workout}
          onSubmit={handleUpdateWorkout}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
};

export default UpdateWorkoutPage;
