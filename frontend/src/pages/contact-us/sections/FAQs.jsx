import Accordion from "../components/Accordion";

const accordionData = [
  {
    title: "Do I need an account to use this site?",
    content: `While you can view the available workouts on the training page, 
    you need an account to log your workouts and track progress.`,
  },
  {
    title: "How do I log a workout?",
    content: `Log in to your account and go to the Dashboard > Logs page. From there, 
    select your workout or workout set, enter your sets, reps, and duration, then save your progress.`,
  },
  {
    title: "What is a workout set?",
    content: `A workout set is a combination of exercises grouped together for a 
    specific training goal, like "Leg Day" or "Full-Body Burn."`,
  },
  {
    title: "Can I create my own workout sets?",
    content: `Yes! You can create custom sets by selecting multiple exercises and 
    saving them under a custom name.`,
  },
];
const FAQs = () => {
  return (
    <section className="w-2/3">
      <header className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-secondary text-red-secondary">
          Got Questions? We&apos;ve got answers.
        </h2>
        <p className="text-base sm:text-xl font-light mt-2">
          If you don&apos;t find what you&apos;re looking for, feel free to
          reach out!
        </p>
      </header>

      <div className="">
        {accordionData.map(({ title, content }, index) => (
          <Accordion key={index} title={title} content={content} />
        ))}
      </div>
    </section>
  );
};

export default FAQs;
