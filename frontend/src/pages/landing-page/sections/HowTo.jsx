const usageInstructions = [
  {
    title: "Create an account",
    description:
      "Sign up and set your fitness goals to personalize your experience.",
  },
  {
    title: "Add Your Workouts",
    description:
      "Select from pre-defined exercises or create custom workout sets.",
  },
  {
    title: "Log Your Progress",
    description: "After each session, log your sets, reps, and duration.",
  },
];

const HowTo = () => {
  return (
    <section className="w-full flex flex-col items-center gap-8 sm:py-16 py-10">
      <h1 className="font-secondary sm:text-5xl text-4xl capitalize">How to get started</h1>

      <div className="flex lg:flex-row flex-col items-center justify-between flex-wrap gap-10">
        

        {usageInstructions.map(({ title, description}, index) => (
          <div key={index} className="slg:size-80 size-70 flex flex-col justify-center gap-5 px-4 border-2 bg-[#d3d3d3]">
            <h3 className="text-6xl font-secondary">{`0${index + 1}`}</h3>
            <h4 className="text-3xl capitalize font-secondary text-red-secondary">
              {title}
            </h4>
            <p className="text-xl">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowTo;
