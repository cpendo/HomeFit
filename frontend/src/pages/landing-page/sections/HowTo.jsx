const STEPS = [
  {
    title: "Create an account",
    description:
      "Sign up and set your fitness goals to personalize your experience.",
  },
  {
    title: "Add your workouts",
    description:
      "Pick from the pre-built library or create your own custom workout sets.",
  },
  {
    title: "Log your progress",
    description:
      "After each session, record your sets, reps, and duration. Watch the streak grow.",
  },
];

const HowTo = () => {
  return (
    <section
      id="how-it-works"
      className="w-full bg-ink text-paper scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="flex flex-col gap-4 max-w-2xl mb-12 sm:mb-16">
          <h2 className="font-secondary uppercase text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
            Three steps. <span className="text-brand">Then go.</span>
          </h2>
        </div>

        <ol className="grid md:grid-cols-3 gap-5">
          {STEPS.map(({ title, description }, index) => (
            <li
              key={title}
              className="relative rounded-2xl border border-paper/15 bg-paper/[0.04] p-7 sm:p-8 flex flex-col gap-4 transition-colors hover:border-brand/60"
            >
              <span className="font-secondary text-7xl sm:text-8xl leading-none text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-secondary uppercase text-2xl sm:text-3xl tracking-tight">
                {title}
              </h3>
              <p className="text-paper/70 leading-relaxed">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowTo;
