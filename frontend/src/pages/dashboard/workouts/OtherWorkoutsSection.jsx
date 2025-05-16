import { IoMdRefreshCircle, IoIosSpeedometer } from "react-icons/io";
import SkeletonWorkoutsSection from "./SkeletonWorkoutsSection";
import { useGetSimilarWorkoutsQuery } from "../../../features/workouts/workoutsApi";
//import { IoMdRefreshCircle } from "react-icons/io";
import PropTypes from "prop-types";
import { Link } from "react-router";

const OtherWorkoutsSection = ({ id, difficulty }) => {
  const {
    data: workouts,
    loading,
    error,
  } = useGetSimilarWorkoutsQuery({ id, difficulty });

  // console.log("workouts", workouts);
  // console.log("error", error);

  const titles = { easy: "Beginner", medium: "intermediate", hard: "advanced" };

  if (loading) return <SkeletonWorkoutsSection />;
  return (
    <>
      <h4 className="font-secondary text-xl uppercase">
        More {titles[difficulty]} Workouts
      </h4>

      <div className="flex flex-col gap-2">
        {workouts?.map((workout, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-5 bg-gray-200 rounded-sm p-3"
          >
            <h1 className="flex items-center justify-center bg-black text-white size-11 rounded-full text-xl">
              {index + 1}
            </h1>
            <div className="flex flex-col gap-1">
              <Link
                to={`/dashboard/workouts/${workout?.id}`}
                className="font-secondary text-xl hover:underline hover:text-red-secondary"
              >
                {workout?.name}
              </Link>
              <div className="flex flex-row gap-4 text-base">
                <p className="flex flex-row gap-1 items-center capitalize">
                  <IoIosSpeedometer className="inline text-2xl text-red-secondary" />{" "}
                  {workout?.difficulty}
                </p>

                <p className="flex flex-row gap-1 items-center capitalize">
                  <IoMdRefreshCircle className="inline text-2xl text-red-secondary" />{" "}
                  {workout?.suggested_reps}
                </p>
              </div>
            </div>
          </div>
        ))}

        {workouts?.length === 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-500">
              {" "}
              No other {titles[difficulty]} workouts available yet. Check back
              later or explore other difficulty levels.
            </p>

            <div className="h-15 flex flex-row items-center bg-gray-200 text-gray-500 rounded-sm p-3">
              <p>New workouts coming soon!</p>
            </div>

            <Link
              to="/dashboard/workouts"
              className="bg-red-secondary w-fit text-white p-2 text-sm rounded-sm"
            >
              Browse all workouts
            </Link>
          </div>
        )}

        {error && (
          <p className="text-lg text-red-secondary">
            The workouts you&apos;re looking for don&apos;t exist or
            couldn&apos;t be loaded. Try again later.
          </p>
        )}
      </div>
    </>
  );
};

OtherWorkoutsSection.propTypes = {
  id: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default OtherWorkoutsSection;
