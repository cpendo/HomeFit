import DoughnutChart from "../charts/DoughnutChart";

const categories = [
  { name: "Cardio", count: 20, color: "#bc2c3e" },
  { name: "Strength", count: 10, color: "#0d0d0e" },
  { name: "Core", count: 10, color: "#6f6f73" },
  { name: "HIIT", count: 5, color: "#d4d1ca" },
];

const CategoryBreakdown = () => {
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <section className="dash-card flex flex-col gap-5">
      <div className="flex flex-col">
        <h2 className="font-secondary text-2xl sm:text-3xl tracking-tight uppercase">
          Categories
        </h2>
        <p className="text-sm text-mute mt-0.5">
          Breakdown of {total} logged workouts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div className="relative h-52 sm:h-60 mx-auto w-full max-w-[260px]">
          <DoughnutChart />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-secondary text-4xl">{total}</span>
            <span className="text-xs uppercase tracking-[0.18em] text-mute">
              Total
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {categories.map((cat) => {
            const pct = Math.round((cat.count / total) * 100);
            return (
              <li key={cat.name} className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="flex-1 flex items-baseline justify-between gap-2 border-b border-line pb-2">
                  <span className="text-sm font-medium">{cat.name}</span>
                  <span className="text-sm text-mute">
                    {cat.count}{" "}
                    <span className="text-mute/70">· {pct}%</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CategoryBreakdown;
