import { Link } from "react-router-dom";
import { LuBicepsFlexed } from "react-icons/lu";
import { FaNoteSticky } from "react-icons/fa6";
import { useGetAllWorkoutsQuery } from "../../../../features/workouts/workoutsApi";
import { useGetStreakDatesQuery } from "../../../../features/logs/logsApi";

const StatTile = ({ to, label, value, icon: Icon }) => (
  <Link
    to={to}
    className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-line bg-white hover:border-ink transition-colors"
  >
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-[0.18em] text-mute">
        {label}
      </span>
      <span className="font-secondary text-3xl tracking-tight mt-1">
        {value}
      </span>
    </div>
    <span className="inline-flex items-center justify-center size-10 rounded-full bg-brand/5 text-brand group-hover:bg-brand group-hover:text-paper transition-colors">
      <Icon className="size-4" />
    </span>
  </Link>
);

const WorkoutStats = () => {
  const { data: workouts, isLoading: loadingW } = useGetAllWorkoutsQuery();
  const { data: streak, isLoading: loadingS } = useGetStreakDatesQuery();

  const savedCount = workouts?.length ?? 0;
  const loggedCount = streak?.dates?.length ?? 0;

  return (
    <section className="dash-card flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="font-secondary text-2xl tracking-tight uppercase">
          Library
        </h2>
        <span className="text-xs uppercase tracking-[0.18em] text-mute">
          Quick links
        </span>
      </div>
      {loadingW || loadingS ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 bg-paper rounded-xl animate-pulse" />
          <div className="h-20 bg-paper rounded-xl animate-pulse" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <StatTile
            to="/dashboard/workouts"
            label="Workouts"
            value={savedCount}
            icon={LuBicepsFlexed}
          />
          <StatTile
            to="/dashboard/logs"
            label="Logged"
            value={loggedCount}
            icon={FaNoteSticky}
          />
        </div>
      )}
    </section>
  );
};

export default WorkoutStats;
