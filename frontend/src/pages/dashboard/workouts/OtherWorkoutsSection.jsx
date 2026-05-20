import { IoMdRefreshCircle, IoIosSpeedometer } from "react-icons/io";
import SkeletonWorkoutsSection from "./components/SkeletonWorkoutsSection";
import { useGetSimilarWorkoutsQuery } from "../../../features/workouts/workoutsApi";
import PropTypes from "prop-types";
import { Link } from "react-router";

const titles = { easy: "Beginner", medium: "Intermediate", hard: "Advanced" };

const OtherWorkoutsSection = ({ id, difficulty }) => {
  const {
    data: workouts,
    loading,
    error,
  } = useGetSimilarWorkoutsQuery({ id, difficulty });

  if (loading) return <SkeletonWorkoutsSection />;

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h3 className="font-secondary text-xl tracking-tight uppercase">
          More {titles[difficulty]} workouts
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {workouts?.map((workout, index) => (
          <Link
            key={workout?.id ?? index}
            to={`/dashboard/workouts/${workout?.id}`}
            className="flex items-center gap-4 p-3 bg-white border border-line rounded-xl hover:border-ink transition-colors group"
          >
            <span className="inline-flex items-center justify-center size-9 rounded-full bg-ink text-paper text-sm font-medium">
              {index + 1}
            </span>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="font-medium truncate group-hover:text-brand transition-colors">
                {workout?.name}
              </span>
              <div className="flex flex-wrap gap-3 text-xs text-mute">
                <span className="inline-flex items-center gap-1 capitalize">
                  <IoIosSpeedometer className="size-3.5 text-brand" />
                  {workout?.difficulty}
                </span>
                <span className="inline-flex items-center gap-1">
                  <IoMdRefreshCircle className="size-3.5 text-brand" />
                  {workout?.suggested_reps}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {workouts?.length === 0 && (
          <div className="bg-white border border-line border-dashed rounded-xl p-4 text-sm text-mute">
            No other {titles[difficulty]?.toLowerCase()} workouts yet. Browse
            <Link
              to="/dashboard/workouts"
              className="text-brand hover:underline ml-1"
            >
              all workouts
            </Link>
            .
          </div>
        )}

        {error && (
          <p className="text-sm text-brand">
            Couldn&apos;t load similar workouts. Try again later.
          </p>
        )}
      </div>
    </>
  );
};

OtherWorkoutsSection.propTypes = {
  id: PropTypes.number,
  difficulty: PropTypes.string,
};

export default OtherWorkoutsSection;
