import BarChart from "../charts/BarChart";

const WeeklyActivity = () => {
  return (
    <section className="dash-card flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex flex-col">
          <h2 className="font-secondary text-2xl sm:text-3xl tracking-tight uppercase">
            Weekly activity
          </h2>
          <p className="text-sm text-mute mt-0.5">
            Effort across the last seven days
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-brand">
          120 min
        </p>
      </div>
      <div className="h-64 sm:h-72">
        <BarChart />
      </div>
    </section>
  );
};

export default WeeklyActivity;
