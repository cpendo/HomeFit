import BarChart from "../charts/BarChart";

const WeeklyActivity = () => {
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-secondary text-2xl text-zinc-900">Activity</h2>
        <p className="text-xs text-muted uppercase tracking-wider">
          120 min this week
        </p>
      </div>
      <div className="flex justify-center items-center">
        <BarChart />
      </div>
    </div>
  );
};

export default WeeklyActivity;
