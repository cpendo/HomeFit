import { IoIosArrowRoundBack } from "react-icons/io";
import { LuBicepsFlexed } from "react-icons/lu";
import { Link } from "react-router-dom";

const WorkoutError = () => {
  return (
    <div className="w-full pt-6 sm:pt-8 flex flex-col gap-5">
      <Link
        to="/dashboard/workouts"
        className="inline-flex items-center gap-1 text-sm text-mute hover:text-ink w-fit transition-colors"
      >
        <IoIosArrowRoundBack className="size-5" />
        Back to workouts
      </Link>

      <div className="bg-white border border-line border-dashed rounded-2xl py-16 flex flex-col items-center text-center gap-3">
        <span className="inline-flex items-center justify-center size-14 rounded-full bg-brand/10 text-brand">
          <LuBicepsFlexed className="size-6" />
        </span>
        <h2 className="font-secondary text-3xl tracking-tight uppercase">
          Workout not found
        </h2>
        <p className="text-sm text-mute max-w-md">
          The workout you&apos;re looking for doesn&apos;t exist or
          couldn&apos;t be loaded.
        </p>
        <Link
          to="/dashboard/workouts"
          className="mt-2 inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-ink text-paper hover:bg-brand transition-colors"
        >
          Back to all workouts
        </Link>
      </div>
    </div>
  );
};

export default WorkoutError;
