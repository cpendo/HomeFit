import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import OtherWorkoutsSection from "./OtherWorkoutsSection";

const WorkoutError = () => {
  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-1">
      <div>
        <Link
          to="/dashboard/workouts"
          className="flex flex-row items-center gap-1 text-base text-gray-500"
        >
          <IoIosArrowRoundBack className="inline text-2xl" />
          Back to workouts
        </Link>
      </div>

      <div className="flex flex-row gap-4">
        <div className="h-120 flex-2 flex flex-col justify-center items-center gap-4 bg-gray-200 rounded-sm p-3">
          <h2 className="text-4xl font-secondary">Workout not found</h2>
          <p className="text-xl">
            The workout you&apos;re looking for doesn&apos;t exist or
            couldn&apos;t be loaded.
          </p>
          <Link
            to="/dashboard/workouts"
            className="text-white bg-red-secondary p-2 rounded-sm"
          >
            Back to all workouts
          </Link>
        </div>

        <div className="flex-1 flex flex-col gap-2 ">
          <OtherWorkoutsSection />
        </div>
      </div>
    </div>
  );
};

export default WorkoutError;
