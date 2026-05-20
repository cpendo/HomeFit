import Accordion from "../../contact-us/components/Accordion";

const accordionData = [
  {
    title: "How do I log a workout?",
    content:
      "Log in to your account and open the Dashboard → Logs page. Select a workout, enter your sets, reps, and duration, then save.",
  },
  {
    title: "What is a workout set?",
    content:
      'A workout set is a group of exercises bundled for a specific goal — for example "Leg Day" or "Full-Body Burn".',
  },
  {
    title: "Can I create my own workouts?",
    content:
      "Yes. You can add custom workouts under your account and group them into sets that you can log later.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="w-full bg-paper text-ink scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <header className="lg:col-span-5 flex flex-col gap-4">
            <h2 className="font-secondary uppercase text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              We&apos;ve got <span className="text-brand">answers</span>.
            </h2>
            <p className="text-base sm:text-lg text-ink/70 leading-relaxed">
              If you don&apos;t find what you&apos;re looking for, reach out via
              the contact details in our portfolio.
            </p>
          </header>

          <div className="lg:col-span-7">
            {accordionData.map(({ title, content }, index) => (
              <Accordion key={index} title={title} content={content} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
